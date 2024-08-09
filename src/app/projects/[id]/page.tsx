"use client"; // Tambahkan ini untuk menandai komponen sebagai komponen klien
import { useParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image'; // Tambahkan import ini
import { Key, useEffect, useState } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [projects, setProjects] = useState<{ title: string; images: (string | StaticImport)[]; description: string; technologies: string[]; link: string; repo: string } | null>(null);


  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch('/project.json');
      const data = await response.json();
      const foundProject = data.find((proj: any) => proj.id === id);
      setProjects(foundProject);
    };

    fetchProject();
  }, [id]);

  if (!projects) {
    return <div>Loading...</div>;
  }
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{projects.title}</h1>

      <Swiper
        pagination={{ clickable: true }}
        navigation
        modules={[Pagination, Navigation]}
        slidesPerView={4}
        spaceBetween={10}
        className="mySwiper mb-4"
      >
        {projects?.images?.map((image: string | StaticImport, index: number) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-64 overflow-hidden rounded-lg cursor-pointer" onClick={() => handleImageClick(image as string)}>
              <Image
                src={image as string}
                alt={`Gambar ${index + 1}`}
                objectFit="cover"
                className="rounded-lg"
                width={800} // Tambahkan properti width
                height={600} // Tambahkan properti height
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <p className="text-gray-700 mb-4">{projects.description}</p>
      
      <h2 className="text-2xl font-semibold mb-2">Teknologi yang Digunakan</h2>
      <ul className="list-disc list-inside mb-4">
        {projects.technologies.map((tech, index) => (
          <li key={index} className="text-gray-700">{tech}</li>
        ))}
      </ul>
      
      <div className="flex space-x-4">
        <a
          href={projects.link}
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lihat Proyek
        </a>
        <a
          href={projects.repo}
          className="inline-block bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lihat Kode
        </a>
      </div>

      {/* Modal untuk Menampilkan Gambar Besar */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={handleCloseModal}>
          <div className="relative w-full max-w-2xl mx-auto">
            <Image
              src={selectedImage}
              alt="Gambar Besar"
              layout="responsive"
              width={800}
              height={600}
              className="rounded-lg"
            />
            <button
              className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-1 hover:bg-red-700"
              onClick={handleCloseModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectDetailPage;