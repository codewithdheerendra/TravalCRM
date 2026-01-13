const toursService = require('../../../../services/tours.service');

/**
 * Tours Controller
 * Handles HTTP requests for tours API endpoints
 */

/**
 * GET /api/v1/admin/tours
 * Get all tours with optional filtering and pagination
 */
exports.getTours = async (req, res) => {
  try {
    // Parse query parameters
    const {
      searchValue,
      filterValue,
      page,
      limit,
      sortByLatestUpdate = 'true',
    } = req.query;

    // Parse filters if provided
    let filters = {};
    if (filterValue) {
      try {
        filters = typeof filterValue === 'string' ? JSON.parse(filterValue) : filterValue;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'Invalid filter format',
          error: error.message,
        });
      }
    }

    // Call service
    const result = await toursService.getAllTours({
      filters,
      searchValue,
      sortByLatestUpdate: sortByLatestUpdate === 'true',
      page: page ? parseInt(page) : null,
      limit: limit ? parseInt(limit) : null,
    });

    return res.status(200).json({
      success: true,
      data: result.tours,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error('Error in getTours:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching tours',
      error: error.message,
    });
  }
};

/**
 * GET /api/v1/admin/tours/:id
 * Get a single tour by ID
 */
exports.getTourById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid tour ID format',
      });
    }

    const tour = await toursService.getTourById(id);

    return res.status(200).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    console.error('Error in getTourById:', error);
    
    if (error.message === 'Tour not found') {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error fetching tour',
      error: error.message,
    });
  }
};

/**
 * POST /api/v1/admin/tours
 * Create a new tour
 */
exports.createTour = async (req, res) => {
  try {
    const tourData = req.body;

    // Basic validation
    if (!tourData.name) {
      return res.status(400).json({
        success: false,
        message: 'Tour name is required',
      });
    }

    const newTour = await toursService.createTour(tourData);

    return res.status(201).json({
      success: true,
      message: 'Tour created successfully',
      data: newTour,
    });
  } catch (error) {
    console.error('Error in createTour:', error);

    if (error.message.includes('unique') || error.message.includes('must be unique')) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error creating tour',
      error: error.message,
    });
  }
};

/**
 * PUT /api/v1/admin/tours/:id
 * Update an existing tour
 */
exports.updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tourData = req.body;

    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid tour ID format',
      });
    }

    const updatedTour = await toursService.updateTour(id, tourData);

    return res.status(200).json({
      success: true,
      message: 'Tour updated successfully',
      data: updatedTour,
    });
  } catch (error) {
    console.error('Error in updateTour:', error);

    if (error.message === 'Tour not found') {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message.includes('unique') || error.message.includes('must be unique')) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error updating tour',
      error: error.message,
    });
  }
};

/**
 * DELETE /api/v1/admin/tours/:id
 * Soft delete a tour
 */
exports.deleteTour = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid tour ID format',
      });
    }

    await toursService.deleteTour(id);

    return res.status(200).json({
      success: true,
      message: 'Tour deleted successfully',
    });
  } catch (error) {
    console.error('Error in deleteTour:', error);

    if (error.message === 'Tour not found') {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error deleting tour',
      error: error.message,
    });
  }
};

