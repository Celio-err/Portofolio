import { useState, useEffect } from 'react'

function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('projects');

  useEffect(() => {
    // Memanggil 3 API Django sekaligus secara paralel
    Promise.all([
      fetch('http://127.0.0.1:8000/api/profile/').then(res => {
        if (!res.ok) throw new Error('Gagal memuat data profil');
        return res.json();
      }),
      fetch('http://127.0.0.1:8000/api/projects/').then(res => {
        if (!res.ok) throw new Error('Gagal memuat data projek');
        return res.json();
      }),
      fetch('http://127.0.0.1:8000/api/certificates/').then(res => {
        if (!res.ok) throw new Error('Gagal memuat data sertifikat');
        return res.json();
      })
    ])
      .then(([profileData, projectsData, certificatesData]) => {
        // Ambil baris profil pertama jika array tidak kosong
        if (profileData && profileData.length > 0) {
          setProfile(profileData[0]);
        }
        setProjects(projectsData);
        setCertificates(certificatesData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center space-y-4">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">Syncing Central Portofolio Engine...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-300 antialiased selection:bg-emerald-500 selection:text-white relative overflow-x-hidden">
      
      {/* BACKGROUND DECORATIVE EFFECTS */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        
        {/* ERROR NOTICE DISPLAY */}
        {error && (
          <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-2xl text-red-400 mb-8 text-sm font-mono text-center shadow-lg">
            ⚠️ [KONEKSI_GAGAL]: Terjadi masalah saat mengambil data dari server Django.
            <br />
            <span className="text-xs text-gray-500">Detail: {error}. Pastikan 'python manage.py runserver' aktif.</span>
          </div>
        )}

        {/* ================= SECTION: PROFILE DEVELOPER ================= */}
        <section className="bg-[#131926]/60 border border-gray-800/80 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Foto Profil */}
            <div className="flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-[#0a0d16] border-2 border-gray-800 flex items-center justify-center overflow-hidden">
                  {profile && profile.foto_perfil ? (
                    <img 
                      src={profile.foto_perfil.startsWith('http') ? profile.foto_perfil : `http://127.0.0.1:8000${profile.foto_perfil}`} 
                      alt={profile.naran} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-20 h-20 text-gray-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            {/* Konten Data Diri */}
            <div className="lg:col-span-2 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/50 border border-emerald-800/50 rounded-full text-xs font-mono text-emerald-400 tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Perfil Celio
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                {profile ? profile.naran : "Celio Sousa Silva"}
              </h1>
              
              <p className="text-gray-400 font-light text-base sm:text-lg leading-relaxed max-w-2xl">
                {profile ? profile.biografia : "Silakan lengkapi biografi profesional Anda melalui halaman Django Admin."}
              </p>

              {/* Grid Metadata Profil */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-md mx-auto lg:mx-0 text-left font-mono text-xs">
                <div className="bg-[#0b0f19]/80 border border-gray-800/60 p-3 rounded-xl">
                  <span className="text-gray-500 block mb-1">HELA FATIN</span>
                  <span className="text-gray-300 font-sans font-medium">
                    {profile ? profile.hela_fatin : "Timor-Leste"}
                  </span>
                </div>
                <div className="bg-[#0b0f19]/80 border border-gray-800/60 p-3 rounded-xl">
                  <span className="text-gray-500 block mb-1">DATA MORIS</span>
                  <span className="text-gray-300 font-sans font-medium">
                    {profile ? profile.data_moris : "-"}
                  </span>
                </div>
              </div>

              {/* Tombol Unduh CV Dinamis */}
              {profile && profile.cv_file && (
                <div className="pt-4 flex justify-center lg:justify-start">
                  <a 
                    href={profile.cv_file.startsWith('http') ? profile.cv_file : `http://127.0.0.1:8000${profile.cv_file}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-emerald-500 shadow-lg shadow-emerald-950/50 transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download Curriculum Vitae (CV)
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================= SECTION: INTERACTIVE TABS ================= */}
        <div className="flex justify-center border-b border-gray-800/60 pb-px mb-10">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('projects')}
              className={`pb-4 px-2 border-b-2 font-mono text-xs uppercase tracking-wider font-semibold transition-all ${
                activeTab === 'projects' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              / projetu ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`pb-4 px-2 border-b-2 font-mono text-xs uppercase tracking-wider font-semibold transition-all ${
                activeTab === 'certificates' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              / sertifikadu ({certificates.length})
            </button>
          </nav>
        </div>

        {/* ================= TAB CONTENT: PROJECTS ================= */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            {projects.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-sm text-gray-500 font-mono bg-[#131926]/20 border border-gray-800/50 rounded-2xl">
                [ Seidauk Iha Projetu ruma ne'ebe Upload ]
              </div>
            ) : (
              projects.map((project) => {
                const imgUrl = project.imajem ? (project.imajem.startsWith('http') ? project.imajem : `http://127.0.0.1:8000${project.imajem}`) : null;
                return (
                  <div key={project.id} className="group bg-[#131926]/40 border border-gray-800/70 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:border-gray-700 flex flex-col justify-between">
                    <div>
                      {/* Tempat Gambar Proyek */}
                      <div className="relative h-52 bg-[#0a0d16] overflow-hidden flex items-center justify-center border-b border-gray-800/40">
                        {imgUrl ? (
                          <img src={imgUrl} alt={project.titulu} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102" />
                        ) : (
                          <div className="text-gray-600 text-xs font-mono">[ NO SCREENSHOT ]</div>
                        )}
                        <div className="absolute top-3 right-3 bg-gray-950/80 backdrop-blur-md text-[10px] font-mono px-2 py-0.5 rounded border border-gray-800 text-gray-500">
                          ID: #{project.id}
                        </div>
                      </div>
                      
                      {/* Info Detail Teks */}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{project.titulu}</h3>
                        <p className="text-gray-400 text-sm font-light line-clamp-3 leading-relaxed">{project.deskrisaun}</p>
                      </div>
                    </div>

                    {/* Badge Teknologi & Link Github */}
                    <div className="px-6 pb-6 pt-2">
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.teknolojia && project.teknolojia.split(',').map((tech, i) => (
                          <span key={i} className="bg-[#0b0f19] text-blue-400 border border-blue-950/60 text-[10px] font-mono px-2.5 py-0.5 rounded">{tech.trim()}</span>
                        ))}
                      </div>
                      <div className="pt-4 border-t border-gray-800/60 flex justify-between items-center">
                        {project.github_link ? (
                          <a href={project.github_link} target="_blank" rel="noreferrer" className="text-xs text-gray-400 hover:text-emerald-400 font-mono transition-colors">
                            source_code // →
                          </a>
                        ) : (
                          <span className="text-xs text-gray-600 font-mono italic">[private_repo]</span>
                        )}
                        <span className="text-[11px] text-gray-500 font-mono bg-gray-900 px-2 py-0.5 rounded border border-gray-800/40">
                          Production
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ================= TAB CONTENT: CERTIFICATES ================= */}
        {activeTab === 'certificates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {certificates.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-sm text-gray-500 font-mono bg-[#131926]/20 border border-gray-800/50 rounded-2xl">
                [ Belum ada sertifikat yang ditambahkan di Django Admin ]
              </div>
            ) : (
              certificates.map((cert) => {
                const certImgUrl = cert.foto ? (cert.foto.startsWith('http') ? cert.foto : `http://127.0.0.1:8000${cert.foto}`) : null;
                return (
                  <div key={cert.id} className="p-6 bg-[#131926]/40 border border-gray-800/70 rounded-2xl flex flex-col justify-between hover:border-gray-700 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/30">
                          {cert.tinan}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">CERT-#{cert.id}</span>
                      </div>

                      {/* Frame untuk menampilkan file gambar sertifikat dari model baru */}
                      {certImgUrl && (
                        <div className="h-40 w-full bg-[#0a0d16] rounded-xl overflow-hidden border border-gray-800/50 mb-4 flex items-center justify-center">
                          <img src={certImgUrl} alt={cert.titulu} className="w-full h-full object-cover" />
                        </div>
                      )}

                      <h3 className="text-lg font-bold text-white tracking-tight">{cert.titulu}</h3>
                    </div>
                    
                    <div className="pt-4 mt-4 border-t border-gray-800/60 flex justify-end text-xs font-mono text-gray-500 italic">
                      Verified Document
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ================= FOOTER ================= */}
        <footer className="text-center mt-24 pt-8 border-t border-gray-800/40 text-[10px] text-gray-600 font-mono tracking-widest uppercase">
          &copy; Celio Sousa Silva • Engenharia Informatica
        </footer>

      </div>
    </div>
  )
}

export default App