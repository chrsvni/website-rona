export interface ScreeningIndicator {
  id: string
  category: 'DISLEKSIA' | 'DISGRAFIA' | 'DISKALKULIA'
  code: string
  title: string
  description: string
  taskContext: string
}

export interface TaskGuide {
  category: 'DISLEKSIA' | 'DISGRAFIA' | 'DISKALKULIA'
  name: string
  duration: string
  materialNeeded: string[]
  objective: string
  instructionsForTeacher: string[]
  taskStepsForStudent: string[]
  rubricNotes: string
}

export const TASK_GUIDES: Record<string, TaskGuide> = {
  DISLEKSIA: {
    category: 'DISLEKSIA',
    name: 'Observasi Membaca Nyaring & Kesadaran Fonemik',
    duration: '15 - 20 Menit',
    materialNeeded: [
      'Teks bacaan narasi sederhana 2 paragraf (font berjarak jelas)',
      'Kartu kata berpola mirip (contoh: b-d, p-q, roda-dora, kasur-rusak)',
      'Lembar ceklis observasi Rona',
    ],
    objective:
      'Mengamati kelancaran decoding kata, pelafalan fonem, ketepatan pengenalan huruf berpola terbalik, dan pemahaman intonasi kalimat.',
    instructionsForTeacher: [
      'Ciptakan suasana yang nyaman dan tidak menekan agar siswa merasa rileks.',
      'Minta siswa membaca teks paragraf pertama dengan suara terdengar.',
      'Perhatikan apakah siswa mengeja per huruf, meloncat baris, atau membalik urutan huruf.',
      'Minta siswa membaca deretan kartu kata terpisah tanpa bantuan gambar konteks.',
      'Catat durasi pengerjaan dan catat perilaku gestur (menunjuk jari, mengernyit, cemas).',
    ],
    taskStepsForStudent: [
      '1. Membaca judul dan paragraf teks bacaan pendek secara bergiliran.',
      '2. Mengidentifikasi huruf awal dan akhir pada 5 kata kunci.',
      '3. Menyebutkan kata yang memiliki bunyi rima yang sama.',
      '4. Menceritakan kembali isi 1 kalimat utama yang baru saja dibaca.',
    ],
    rubricNotes:
      'Fokus pada kesulitan fonologis dan konsistensi kesalahan, bukan pada kecepatan membaca semata.',
  },
  DISGRAFIA: {
    category: 'DISGRAFIA',
    name: 'Observasi Menulis Dikte & Pola Motorik Halus',
    duration: '20 - 25 Menit',
    materialNeeded: [
      'Kertas bergaris dan kertas polos HVS',
      'Pensil standar (HB atau 2B) dan penghapus',
      'Teks contoh tulisan cetak pendek untuk disalin',
    ],
    objective:
      'Mengamati posisi genggaman alat tulis (pencil grip), konsistensi ukuran dan spasi huruf, kestabilan garis dasar, serta ketahanan motorik tangan.',
    instructionsForTeacher: [
      'Amati cara siswa memegang pensil (apakah terlalu kaku, terlalu menekan kertas, atau canggung).',
      'Minta siswa menyalin 2 baris kalimat dari papan tulis atau lembar contoh.',
      'Diktekan 1 kalimat pendek baru tanpa melihat teks contoh.',
      'Perhatikan apakah siswa cepat mengeluh lelah pada pergelangan tangan atau jari.',
      'Amati kerapian huruf besar dan kecil yang sering tertukar atau tidak proporsional.',
    ],
    taskStepsForStudent: [
      '1. Menulis nama lengkap, kelas, dan tanggal di bagian atas kertas bergaris.',
      "2. Menyalin kalimat: 'Kucing belang melompat tinggi di atas pagar'.",
      '3. Menuliskan kalimat pendek hasil dikte dari guru.',
      '4. Menggambar pola zig-zag dan spiral menyambung tanpa mengangkat pensil.',
    ],
    rubricNotes:
      'Perhatikan bentuk huruf yang tidak tuntas, kerapian spasi antarkata, serta jejak tekanan pensil di balik kertas.',
  },
  DISKALKULIA: {
    category: 'DISKALKULIA',
    name: 'Observasi Penalaran Jumlah, Nilai Tempat & Aritmatika Dasar',
    duration: '15 - 20 Menit',
    materialNeeded: [
      'Benda manipulatif konkret (kancing warna-warni / stik es krim / balok 10)',
      'Kartu garis bilangan (number line 1-20)',
      'Lembar perbandingan kuantitas dan simbol matematika (+, -, =, >)',
    ],
    objective:
      'Mengamati kemampuan pemahaman magnitudo angka, subitizing (mengenali jumlah kecil sekilas tanpa menghitung satu per satu), dan logika nilai tempat.',
    instructionsForTeacher: [
      'Tunjukkan 4 buah kancing sejenak (2 detik), tanyakan berapa jumlahnya tanpa dihitung satu-satu (subitizing).',
      'Minta siswa membandingkan dua bilangan: mana yang lebih besar antara 17 dan 71.',
      'Gunakan benda nyata untuk mempraktikkan konsep penjumlahan sederhana.',
      'Perhatikan apakah siswa masih sangat bergantung pada jari bahkan untuk operasi 2+1.',
      'Amati apakah siswa kebingungan membedakan simbol tanda operasi (+ vs x, - vs =).',
    ],
    taskStepsForStudent: [
      '1. Menentukan kumpulan benda mana yang lebih banyak secara visual.',
      '2. Mengurutkan 4 kartu angka acak dari terkecil ke terbesar pada garis bilangan.',
      '3. Memecahkan teka-teki logika kelereng menggunakan bantuan balok hitung.',
      '4. Menghubungkan simbol angka numerik (misal: 6) dengan kumpulan titik benda yang tepat.',
    ],
    rubricNotes:
      'Bedakan antara siswa yang belum diajarkan rumus dengan siswa yang kesulitan memahami konsep dasar ukuran kuantitas.',
  },
}

export const SCREENING_INDICATORS: ScreeningIndicator[] = [
  // DISLEKSIA
  {
    id: 'dys_01',
    category: 'DISLEKSIA',
    code: 'DS-01',
    title: 'Kebingungan Pola Huruf Mirip',
    description:
      'Sering tertukar membedakan huruf dengan bentuk mirip seperti b/d, p/q, m/w, atau n/u saat membaca teks.',
    taskContext: 'Terlihat pada saat membaca kata tunggal dan teks cerita.',
  },
  {
    id: 'dys_02',
    category: 'DISLEKSIA',
    code: 'DS-02',
    title: 'Penghilangan atau Penambahan Suku Kata',
    description:
      'Sering menghilangkan suku kata di tengah/akhir, melompati kata kecil, atau menambahkan imbuhan yang tidak ada.',
    taskContext: 'Terlihat saat membaca bersuara (nyaring).',
  },
  {
    id: 'dys_03',
    category: 'DISLEKSIA',
    code: 'DS-03',
    title: 'Kesulitan Memecah Bunyi Fonemik (Decoding)',
    description:
      'Mengalami hambatan saat mengeja kata baru yang belum pernah dihafal, kesulitan merangkai bunyi huruf menjadi satu kata.',
    taskContext: 'Terlihat saat diberikan kata asing sederhana.',
  },
  {
    id: 'dys_04',
    category: 'DISLEKSIA',
    code: 'DS-04',
    title: 'Kehilangan Baris Saat Membaca',
    description:
      'Sering kehilangan jejak baris bacaan, melompati baris ke bawah, atau harus selalu menggunakan jari telunjuk sebagai penanda.',
    taskContext: 'Terlihat pada teks lebih dari 2 baris bersambung.',
  },
  {
    id: 'dys_05',
    category: 'DISLEKSIA',
    code: 'DS-05',
    title: 'Membalik Urutan Bunyi Kata (Transposisi)',
    description:
      "Membaca kata secara terbalik urutannya, misalnya 'kasur' dibaca 'rusak', atau 'batu' dibaca 'tuba'.",
    taskContext: 'Terlihat saat membaca cepat.',
  },
  {
    id: 'dys_06',
    category: 'DISLEKSIA',
    code: 'DS-06',
    title: 'Ketidakmampuan Mengingat Rima Bunyi',
    description:
      'Sulit mengidentifikasi pasangan kata yang berima sama (contoh: mata - bata - kata) atau permainan asosiasi rima.',
    taskContext: 'Terlihat pada tes permainan lisan.',
  },
  {
    id: 'dys_07',
    category: 'DISLEKSIA',
    code: 'DS-07',
    title: 'Penurunan Pemahaman Akibat Beban Ejaan',
    description:
      'Sangat kelelahan setelah membaca sehingga tidak mampu memahami makna atau menjawab pertanyaan isi cerita yang baru dibaca.',
    taskContext: 'Terlihat pada evaluasi pemahaman bacaan.',
  },
  {
    id: 'dys_08',
    category: 'DISLEKSIA',
    code: 'DS-08',
    title: 'Penghindaran Emosional Aktivitas Membaca',
    description:
      'Menunjukkan rasa cemas berlebih, enggan, menolak, atau gelisah saat diminta giliran membaca nyaring di hadapan kelas.',
    taskContext: 'Terlihat dari ekspresi dan gestur perilaku harian.',
  },

  // DISGRAFIA
  {
    id: 'dg_01',
    category: 'DISGRAFIA',
    code: 'DG-01',
    title: 'Genggaman Pensil Canggung atau Terlalu Menekan',
    description:
      'Memegang pensil dengan posisi jari kaku/tidak ergonomis, serta menekan pensil sangat kuat hingga kertas berlekuk atau robek.',
    taskContext: 'Terlihat pada menit-menit awal aktivitas menulis.',
  },
  {
    id: 'dg_02',
    category: 'DISGRAFIA',
    code: 'DG-02',
    title: 'Bentuk Huruf Tidak Konsisten & Tidak Lengkap',
    description:
      'Ukuran huruf berubah-ubah secara ekstrem (campuran besar dan kecil tanpa aturan), atau garis huruf tidak tertutup sempurna.',
    taskContext: 'Terlihat pada lembar salinan tulisan tangan.',
  },
  {
    id: 'dg_03',
    category: 'DISGRAFIA',
    code: 'DG-03',
    title: 'Kesulitan Menjaga Garis Dasar (Baseline Drift)',
    description:
      'Tulisan melayang naik ke atas atau merosot turun melewati batas garis buku bergaris secara tidak terkontrol.',
    taskContext: 'Terlihat pada tugas menulis kalimat panjang.',
  },
  {
    id: 'dg_04',
    category: 'DISGRAFIA',
    code: 'DG-04',
    title: 'Spasi Antarkata Tidak Teratur atau Menumpuk',
    description:
      'Menuliskan kata-kata terlalu rapat tanpa jeda spasi atau sebaliknya memberikan spasi sangat lebar di tengah satu kata.',
    taskContext: 'Terlihat pada paragraf kalimat dikte.',
  },
  {
    id: 'dg_05',
    category: 'DISGRAFIA',
    code: 'DG-05',
    title: 'Kelelahan Otot Tangan yang Sangat Cepat',
    description:
      'Sering mengeluh pergelangan tangan atau jari sakit, sering mengibaskan tangan, atau berhenti menulis setelah 1-2 kalimat pendek.',
    taskContext: 'Terlihat setelah 5-10 menit menulis.',
  },
  {
    id: 'dg_06',
    category: 'DISGRAFIA',
    code: 'DG-06',
    title: 'Kesenjangan Antara Pikiran Lisan dan Tulisan',
    description:
      'Siswa mampu menceritakan ide secara lisan dengan lancar dan cerdas, namun kesulitan menuangkannya ke dalam tulisan kalimat tertulis.',
    taskContext: 'Terlihat pada tugas karangan bebas atau menjawab esai.',
  },
  {
    id: 'dg_07',
    category: 'DISGRAFIA',
    code: 'DG-07',
    title: 'Kesulitan Mengorganisir Tata Letak di Kertas',
    description:
      'Tulisan menabrak batas tepi margin kertas, orientasi kertas sering dimiringkan secara ekstrem, atau memulai baris di sembarang tempat.',
    taskContext: 'Terlihat pada tata letak pengerjaan tugas.',
  },
  {
    id: 'dg_08',
    category: 'DISGRAFIA',
    code: 'DG-08',
    title: 'Kecepatan Menulis Sangat Lambat Dibanding Teman Sebaya',
    description:
      'Membutuhkan waktu 2-3 kali lebih lama untuk sekadar menyalin catatan singkat dari papan tulis.',
    taskContext: 'Terlihat saat aktivitas mencatat pelajaran kelas.',
  },

  // DISKALKULIA
  {
    id: 'dc_01',
    category: 'DISKALKULIA',
    code: 'DC-01',
    title: 'Kesulitan Konsep Besaran (Subitizing & Magnitudo)',
    description:
      'Tidak dapat memperkirakan mana yang lebih banyak/sedikit tanpa menghitung satu demi satu, bahkan untuk jumlah di bawah 5.',
    taskContext: 'Terlihat pada perbandingan objek visual langsung.',
  },
  {
    id: 'dc_02',
    category: 'DISKALKULIA',
    code: 'DC-02',
    title: 'Ketergantungan Kuat pada Hitungan Jari',
    description:
      'Tetap harus menggunakan jari tangan untuk penjumlahan/pengurangan paling mendasar (seperti 2 + 3) meski usia sudah di atas 8 tahun.',
    taskContext: 'Terlihat saat tes hitung cepat di kelas.',
  },
  {
    id: 'dc_03',
    category: 'DISKALKULIA',
    code: 'DC-03',
    title: 'Kebingungan Nilai Tempat Puluhan & Satuan',
    description:
      'Sering membalik urutan angka bernilai mirip, misalnya menulis atau menganggap angka 21 bernilai sama dengan 12.',
    taskContext: 'Terlihat pada angka dua digit dan operasi susun.',
  },
  {
    id: 'dc_04',
    category: 'DISKALKULIA',
    code: 'DC-04',
    title: 'Kesulitan Menghubungkan Simbol dengan Makna Operasi',
    description:
      'Kerap tertukar antara tanda tambah (+), kali (x), kurang (-), dan bagi (:) saat mengerjakan lembar latihan matematika.',
    taskContext: 'Terlihat pada lembar soal campuran simbol.',
  },
  {
    id: 'dc_05',
    category: 'DISKALKULIA',
    code: 'DC-05',
    title: 'Hambatan Mental Membaca Garis Bilangan (Number Line)',
    description:
      'Sulit memahami urutan maju dan mundur angka, bingung menentukan angka apa sebelum 15 atau setelah 19.',
    taskContext: 'Terlihat pada latihan berhitung melompat atau mundur.',
  },
  {
    id: 'dc_06',
    category: 'DISKALKULIA',
    code: 'DC-06',
    title: 'Kesulitan Konsep Waktu, Jam, dan Uang',
    description:
      'Sangat sulit membaca jam analog jarum, bingung memperkirakan durasi 10 menit vs 1 jam, atau kesulitan mengenali nilai pecahan uang koin/kertas.',
    taskContext: 'Terlihat pada materi kehidupan sehari-hari.',
  },
  {
    id: 'dc_07',
    category: 'DISKALKULIA',
    code: 'DC-07',
    title: 'Frustrasi pada Soal Cerita Matematika Konseptual',
    description:
      'Bingung menerjemahkan narasi kalimat soal cerita menjadi kalimat matematika logis, meski kata-katanya bisa dibaca.',
    taskContext: 'Terlihat pada pengerjaan soal problem-solving matematika.',
  },
  {
    id: 'dc_08',
    category: 'DISKALKULIA',
    code: 'DC-08',
    title: 'Kecemasan Tinggi Terhadap Angka (Math Anxiety)',
    description:
      'Menunjukkan tanda stres fisik, menunduk, menangis, atau blocking pikiran begitu buku matematika dibuka.',
    taskContext: 'Terlihat saat sesi pelajaran berhitung dimulai.',
  },
]

export interface SystemDiagnosisResult {
  totalScore: number
  maxScore: number
  percentageScore: number
  riskLevel: 'Rendah' | 'Sedang' | 'Tinggi'
  category: string
  summaryTitle: string
  systemRecommendation: string
  actionPlan: string
  indicatorBreakdown: {
    title: string
    score: number
    level: string
  }[]
}

/**
 * Mesin Perhitungan Otomatis Sistem Rona
 * "Rekomendasi diatur oleh sistem bukan guru"
 */
export function calculateScreeningBySystem(
  category: 'DISLEKSIA' | 'DISGRAFIA' | 'DISKALKULIA',
  answers: { indicatorId: string; score: number; note?: string }[],
  studentName: string
): SystemDiagnosisResult {
  const relevantIndicators = SCREENING_INDICATORS.filter(
    (ind) => ind.category === category
  )

  const maxScore = relevantIndicators.length * 4
  let totalScore = 0

  const breakdown = relevantIndicators.map((ind) => {
    const ans = answers.find((a) => a.indicatorId === ind.id)
    const score = ans ? ans.score : 1
    totalScore += score
    let level = 'Rendah'
    if (score === 3) level = 'Sedang'
    if (score === 4) level = 'Tinggi'
    return {
      title: ind.title,
      score,
      level,
    }
  })

  const percentageScore = Math.round((totalScore / maxScore) * 100)

  let riskLevel: 'Rendah' | 'Sedang' | 'Tinggi' = 'Rendah'
  if (percentageScore >= 65) {
    riskLevel = 'Tinggi'
  } else if (percentageScore >= 40) {
    riskLevel = 'Sedang'
  } else {
    riskLevel = 'Rendah'
  }

  let summaryTitle = ''
  let systemRecommendation = ''
  let actionPlan = ''

  if (category === 'DISLEKSIA') {
    if (riskLevel === 'Tinggi') {
      summaryTitle = `Indikasi Signifikan Kesulitan Pemrosesan Fonologis & Pola Huruf (Kecenderungan Disleksia)`
      systemRecommendation = `Berdasarkan kalkulasi sistem, siswa ${studentName} menunjukkan pola hambatan fonologis dan pengenalan ortografi yang konsisten dan persisten. Sistem merekomendasikan penerapan metode multisensori terstruktur (Orton-Gillingham) secara intensif dan adaptasi materi bacaan di kelas, serta disarankan untuk mengagendakan evaluasi diagnostik komprehensif bersama psikolog pendidikan atau ortopedagog.`
      actionPlan = `1. Pendekatan Multisensori (VAKT): Gunakan media pasir warna, plastisin, atau huruf amplas saat mengenalkan fonem mirip (b, d, p, q).\n2. Format Materi Ramah Disleksia: Gunakan ukuran huruf minimal 14pt (font sans-serif berjarak lebar seperti OpenDyslexic atau Arial) dengan kontras latar pastel lembut (hindari putih menyilaukan).\n3. Kurangi Beban Baca Nyaring Spontan: Hindari meminta siswa membaca nyaring di depan umum tanpa persiapan sebelumnya agar tidak memicu trauma atau kecemasan sosial.\n4. Berikan Tambahan Waktu: Berikan perpanjangan waktu 25-50% saat tugas membaca pemahaman.\n5. Konsultasi Khusus: Bagikan kartu hasil skrining ini kepada orang tua untuk ditindaklanjuti ke unit layanan bimbingan konseling atau psikolog tumbuh kembang anak.`
    } else if (riskLevel === 'Sedang') {
      summaryTitle = `Indikasi Menengah Hambatan Kelancaran Membaca`
      systemRecommendation = `Siswa ${studentName} menunjukkan beberapa indikator kesulitan membaca pada kata-kata baru atau teks yang padat, namun masih memiliki respons positif terhadap petunjuk kontekstual. Diperlukan penguatan kesadaran fonemik berkala dan pendampingan membaca berpasangan (paired reading).`
      actionPlan = `1. Latihan Membaca Berpasangan (Paired Reading) 10 menit setiap hari bersama guru atau tutor sebaya.\n2. Kartu Kata Bergambar (Flashcard Fonem) untuk melatih transisi bunyi huruf tanpa rasa bosan.\n3. Gunakan penggaris penutup baris (reading tracker) agar mata siswa tidak melompat ke baris berikutnya.\n4. Evaluasi ulang perkembangan dalam waktu 30 hari ke depan dengan instrumen Rona.`
    } else {
      summaryTitle = `Indikasi Rendah / Variasi Belajar Dalam Batas Wajar`
      systemRecommendation = `Hasil observasi menunjukkan kesulitan membaca berada dalam batas wajar proses perkembangan usia siswa. Tidak ditemukan indikasi persisten disleksia. Lanjutkan stimulasi literasi umum dengan ragam buku cerita bergambar.`
      actionPlan = `1. Pertahankan motivasi membaca melalui sudut baca kelas yang menarik.\n2. Berikan apresiasi terhadap setiap pencapaian kosakata baru siswa.\n3. Catat perkembangan berkala jika sewaktu-waktu terdapat penurunan minat baca.`
    }
  } else if (category === 'DISGRAFIA') {
    if (riskLevel === 'Tinggi') {
      summaryTitle = `Indikasi Signifikan Hambatan Motorik Halus & Integrasi Visual-Motor (Kecenderungan Disgrafia)`
      systemRecommendation = `Sistem mendeteksi skor kelelahan motorik, ketidakkonsistenan bentuk huruf, dan hambatan spasial menulis yang melampaui ambang normal. Siswa ${studentName} memerlukan akomodasi alat tulis khusus, adaptasi lembar tugas, serta rujukan evaluasi terapi okupasi untuk memperkuat tonus otot jemari.`
      actionPlan = `1. Alat Bantu Ergonomis: Pasangkan pencil grip segitiga berbahan silikon pada pensil untuk mengurangi tekanan kaku jari.\n2. Modifikasi Garis Buku: Gunakan buku bergaris tiga atau kertas bergaris dengan garis pembatas kontras warna tebal.\n3. Penyesuaian Penilaian: Nilai jawaban siswa berdasarkan substansi isi pemikiran, bukan semata kerapian coretan tulisan tangan.\n4. Alternatif Mengetik atau Lisan: Izinkan siswa menyampaikan jawaban secara lisan atau menggunakan keyboard laptop jika tugas cukup panjang.\n5. Latihan Senam Jari & Tangan: Lakukan 'finger warm-up' (meremas bola stres lembut) selama 2 menit sebelum mulai menulis.`
    } else if (riskLevel === 'Sedang') {
      summaryTitle = `Indikasi Menengah Kelelahan Motorik Menulis`
      systemRecommendation = `Siswa menunjukkan kerapian tulisan yang menurun seiring bertambahnya waktu menulis dan posisi pensil yang belum ergonomis. Perlu pembiasaan teknik memegang alat tulis yang rileks dan jeda istirahat berkala.`
      actionPlan = `1. Batasi volume mencatat panjang dari papan tulis, sediakan lembar rangkuman siap isi (fill-in-the-blank).\n2. Ajarkan posisi duduk tegak dengan telapak kaki menapak lantai secara stabil.\n3. Latihan menggambar pola garis bersambung secara rileks tanpa mengangkat alat tulis.`
    } else {
      summaryTitle = `Indikasi Rendah / Keterampilan Menulis Dalam Batas Normal`
      systemRecommendation = `Koordinasi motorik halus siswa berada dalam rentang wajar. Variasi kerapian tulisan dipengaruhi oleh faktor konsentrasi sesaat atau kecepatan pengerjaan tugas standar.`
      actionPlan = `1. Lanjutkan kegiatan motorik halus kreatif (origami, menggunting, mewarnai).\n2. Berikan umpan balik positif pada kerapian tata letak tulisan.`
    }
  } else {
    // DISKALKULIA
    if (riskLevel === 'Tinggi') {
      summaryTitle = `Indikasi Signifikan Defisit Penalaran Angka & Nilai Tempat (Kecenderungan Diskalkulia)`
      systemRecommendation = `Sistem mengidentifikasi adanya hambatan inti pada kemampuan memproses magnitudo bilangan dan representasi mental angka pada ${studentName}. Siswa memerlukan pendekatan pengajaran CPA (Concrete - Pictorial - Abstract) dengan manipulatif fisik serta akomodasi pengenalan konsep hitung visual.`
      actionPlan = `1. Pendekatan CPA (Concrete - Pictorial - Abstract): Jangan langsung melompat ke rumus angka simbolik; wajib selalu mendahului dengan benda nyata (kancing, balok, buah tiruan) lalu gambar grafis.\n2. Pemanfaatan Garis Bilangan Berwarna: Sediakan garis bilangan meja 1-20 berpita warna untuk membantu visualisasi arah maju-mundur.\n3. Hindari Penekanan Hitung Hafalan Cepat: Berikan keleluasaan waktu dan jangan paksa siswa mengikuti tes berhitung berwaktu (speed drills) yang memicu kecemasan angka.\n4. Pengelompokan Visual: Gunakan grid berkotak atau kertas milimeter blok untuk membantu penataan kolom operasi penjumlahan/pengurangan susun.\n5. Diskusi Perkembangan dengan Ahli Pendidikan Khusus / Psikolog Anak.`
    } else if (riskLevel === 'Sedang') {
      summaryTitle = `Indikasi Menengah Pemahaman Konsep Aritmatika Abstrak`
      systemRecommendation = `Siswa masih sering bingung pada simbol operasi hitung dan nilai puluhan-satuan, namun menunjukkan pemahaman yang baik bila dipandu dengan contoh visual nyata.`
      actionPlan = `1. Gunakan kartu pengingat simbol matematika bergambar di sudut meja siswa.\n2. Hubungkan operasi matematika dengan cerita nyata yang dekat dengan kehidupan siswa (misal belanja makanan ringan favorit).\n3. Kurangi jumlah soal latihan tetapi tingkatkan pendalaman pemahaman konseptual.`
    } else {
      summaryTitle = `Indikasi Rendah / Penalaran Angka Dalam Batas Normal`
      systemRecommendation = `Kemampuan representasi kuantitas dan logika aritmatika dasar siswa berkembang dengan baik sesuai tingkatan usianya.`
      actionPlan = `1. Lanjutkan pemberian tantangan permainan matematika logika yang interaktif.\n2. Tingkatkan kepercayaan diri siswa dalam eksplorasi pemecahan masalah angka.`
    }
  }

  return {
    totalScore,
    maxScore,
    percentageScore,
    riskLevel,
    category,
    summaryTitle,
    systemRecommendation,
    actionPlan,
    indicatorBreakdown: breakdown,
  }
}
