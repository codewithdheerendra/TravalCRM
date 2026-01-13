const NewTours = require('../models/newTours');

/**
 * Tours Service
 * Handles business logic for tour operations
 */

/**
 * Get all tours with optional filtering and pagination
 * @param {Object} options - Query options
 * @param {Object} options.filters - Filter criteria
 * @param {String} options.searchValue - Search term
 * @param {Boolean} options.sortByLatestUpdate - Sort by updatedAt if true, else by displayOrder
 * @param {Number} options.page - Page number for pagination
 * @param {Number} options.limit - Items per page
 * @returns {Promise<Object>} Tours list and metadata
 */
async function getAllTours(options = {}) {
  try {
    const {
      filters = {},
      searchValue = null,
      sortByLatestUpdate = true,
      page = null,
      limit = null,
    } = options;

    let queryConditions = [];

    // Filter by departure city
    if (filters['Departure city'] && filters['Departure city'].length > 0) {
      queryConditions.push({
        'deptcities.City': {
          $in: filters['Departure city'].map(
            (city) => new RegExp(`^${city}$`, 'i')
          ),
        },
      });
    }

    // Filter by tour category
    if (filters['Tour category'] && filters['Tour category'].length > 0) {
      if (filters['Tour category'][0].toLowerCase() !== 'all') {
        queryConditions.push({
          tripCategories: {
            $in: filters['Tour category'].map(
              (tag) => new RegExp(`^${tag}$`, 'i')
            ),
          },
        });
      }
    }

    // Filter by tour type
    if (filters['Tour type'] && filters['Tour type'].length > 0) {
      queryConditions.push({
        travelerType: {
          $in: filters['Tour type'].map((type) => new RegExp(`^${type}$`, 'i')),
        },
      });
    }

    // Filter by states
    if (filters['States']) {
      let statesFilter = filters['States'];
      if (!Array.isArray(statesFilter)) {
        statesFilter = [statesFilter];
      }
      queryConditions.push({
        state: {
          $in: statesFilter.map((type) => new RegExp(`^${type}$`, 'i')),
        },
      });
    }

    // Search functionality
    if (searchValue) {
      const regex = new RegExp(
        '.*' + searchValue.split(' ').join('.*') + '.*',
        'i'
      );
      queryConditions.push({
        $or: [
          { name: regex },
          { state: regex },
          { destinations: regex },
          { route: regex },
          { about: regex },
          { 'deptcities.City': regex },
          { 'deptcities.State': regex },
          { tripType: regex },
          { 'itinerary.description': regex },
          { activities: regex },
          { things_to_carry: regex },
          { guidelines: regex },
          { bookncancel: regex },
          { travelerType: regex },
          { tripCategories: regex },
        ],
      });
    }

    // Filter by departure date
    if (
      filters['Filter by departure date between'] &&
      filters['Filter by departure date between'].length === 2
    ) {
      const [startDate, endDate] = filters['Filter by departure date between'];
      queryConditions.push({
        $or: [
          {
            trip_dates: { $gte: new Date(startDate), $lte: new Date(endDate) },
          },
          {
            upcomingtrip: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          },
        ],
      });
    }

    // Build query - exclude soft deleted tours
    const baseQuery = { isDeleted: false };
    const query =
      queryConditions.length > 0
        ? { $and: [baseQuery, ...queryConditions] }
        : baseQuery;

    // Build query object
    let tourQuery = NewTours.find(query);

    // Sorting
    if (sortByLatestUpdate) {
      tourQuery = tourQuery.sort({ updatedAt: -1 });
    } else {
      tourQuery = tourQuery.sort({ displayOrder: 1 });
    }

    // Pagination
    if (page && limit) {
      const skip = (page - 1) * limit;
      tourQuery = tourQuery.skip(skip).limit(parseInt(limit));
    }

    // Execute query
    const tours = await tourQuery;
    const total = await NewTours.countDocuments(query);

    return {
      tours,
      total,
      page: page || 1,
      limit: limit || total,
      totalPages: limit ? Math.ceil(total / limit) : 1,
    };
  } catch (error) {
    throw new Error(`Error fetching tours: ${error.message}`);
  }
}

/**
 * Get a single tour by ID
 * @param {String} tourId - Tour ID
 * @returns {Promise<Object>} Tour object
 */
async function getTourById(tourId) {
  try {
    const tour = await NewTours.findOne({
      _id: tourId,
      isDeleted: false,
    });

    if (!tour) {
      throw new Error('Tour not found');
    }

    return tour;
  } catch (error) {
    throw new Error(`Error fetching tour: ${error.message}`);
  }
}

/**
 * Create a new tour
 * @param {Object} tourData - Tour data
 * @returns {Promise<Object>} Created tour
 */
async function createTour(tourData) {
  try {
    // Check if tour name already exists
    const existingTour = await NewTours.findOne({
      name: tourData.name,
      isActive: true,
      isDeleted: false,
    });

    if (existingTour) {
      throw new Error('Tour name must be unique');
    }

    const newTour = new NewTours({
      ...tourData,
      isDeleted: false,
    });

    const savedTour = await newTour.save();
    return savedTour;
  } catch (error) {
    if (error.message.includes('unique')) {
      throw new Error('Tour name must be unique');
    }
    throw new Error(`Error creating tour: ${error.message}`);
  }
}

/**
 * Update an existing tour
 * @param {String} tourId - Tour ID
 * @param {Object} tourData - Updated tour data
 * @returns {Promise<Object>} Updated tour
 */
async function updateTour(tourId, tourData) {
  try {
    // Check if tour exists
    const existingTour = await NewTours.findOne({
      _id: tourId,
      isDeleted: false,
    });

    if (!existingTour) {
      throw new Error('Tour not found');
    }

    // Check if name is being changed and if it conflicts
    if (tourData.name && tourData.name !== existingTour.name) {
      const nameConflict = await NewTours.findOne({
        name: tourData.name,
        isActive: true,
        isDeleted: false,
        _id: { $ne: tourId },
      });

      if (nameConflict) {
        throw new Error('Tour name must be unique');
      }
    }

    const updatedTour = await NewTours.findByIdAndUpdate(
      tourId,
      { ...tourData },
      { new: true, runValidators: true }
    );

    return updatedTour;
  } catch (error) {
    throw new Error(`Error updating tour: ${error.message}`);
  }
}

/**
 * Soft delete a tour
 * @param {String} tourId - Tour ID
 * @returns {Promise<Object>} Deleted tour
 */
async function deleteTour(tourId) {
  try {
    const tour = await NewTours.findOne({
      _id: tourId,
      isDeleted: false,
    });

    if (!tour) {
      throw new Error('Tour not found');
    }

    // Soft delete
    tour.isDeleted = true;
    const deletedTour = await tour.save();

    return deletedTour;
  } catch (error) {
    throw new Error(`Error deleting tour: ${error.message}`);
  }
}

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};

