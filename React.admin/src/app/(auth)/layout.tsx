import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[1fr_400px] h-screen md:p-5 gap-5">
      <div className="relative hidden md:block h-full w-full md:rounded-xl md:shadow-lg md:shadow-gray-500/20 overflow-hidden">
        <Image
          alt="bg-image"
          src="/images/icons/beautiful-place-pictures-4z0hjwoi8rjhlk1p.jpeg"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center max-w-md mx-auto">
        {children}
      </div>
    </section>
  );
}
