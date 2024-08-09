"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image"; // Tambahkan import ini

const ProjectsPage = () => {
    const [projects, setProjects] = useState<any[]>([]); // Ubah ini untuk menginisialisasi sebagai array kosong
    
    useEffect(() => {
        const fetchProjects = async () => {
          try {
            const response = await fetch('/project.json');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProjects(data);
          } catch (error) {
            console.error('Fetch error:', error); // Tambahkan ini untuk menangkap kesalahan
          }
        };
        
        fetchProjects();
      }, []);
    
      
    return (
      <section className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8">Proyek Saya</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(projects) && projects.map((project: { id: string; images: string[]; title: string; description: string }) => ( // Tambahkan pemeriksaan ini
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {project.images.length > 0 && <Image src={project.images[0]} alt={project.title} className="w-full h-48 object-cover" width={500} height={300} />} {/* Ganti <img> dengan <Image> dan tambah pemeriksaan untuk images */}
              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <Link
                  href={`/projects/${project.id}`}
                  className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                  rel="noopener noreferrer"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default ProjectsPage;