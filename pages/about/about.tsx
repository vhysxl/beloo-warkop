import { Card, CardBody, Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

import Navigation from "@/components/navbar";

export default function TentangKamiBeloo() {
  return (
    <>
      <Navigation />
      <motion.div
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8 sm:py-12 md:py-16"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-8 sm:mb-10 md:mb-12">
          Tentang Beloo Warkop
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: -50, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Image
              alt="Beloo Warkop"
              className="rounded-lg shadow-lg"
              height={400}
              src="https://media.discordapp.net/attachments/710145990597935177/1328032943230160998/2023-05-01.jpg?ex=67853a8f&is=6783e90f&hm=cd12a71f97bdf1ad0d08c463144f0851bb7e96b0b000a16e7cb260b31b1fbc4d&=&format=webp"
              width={600}
            />
          </motion.div>

          <motion.div
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: 50, opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card>
              <CardBody>
                <h2 className="text-2xl font-semibold mb-4">Tentang Kami</h2>
                <p className="mb-4">
                  Selamat datang di Beloo Warkop, destinasi kopi favorit Anda
                  yang berlokasi di Jl. Pangeran Jayakarta, Harapan Mulya, Medan
                  Satria, Bekasi. Dikenal dengan kopi berkualitas tinggi dan
                  suasana yang nyaman, kami menjadi tempat pilihan bagi
                  mahasiswa, profesional, dan para pecinta kopi. Di Beloo
                  Warkop, kami berkomitmen untuk meningkatkan pengalaman Anda
                  dengan menggabungkan tradisi dan inovasi. Melalui website ini,
                  Anda dapat menjelajahi menu kami, mendapatkan informasi
                  terbaru tentang acara spesial, dan menikmati kemudahan
                  pemesanan online. Baik untuk menikmati secangkir kopi cepat
                  atau bersantai, kami berusaha menjadikan setiap kunjungan Anda
                  berkesan. Beloo Warkop bukan sekadar kedai kopi – kami adalah
                  bagian dari komunitas Anda.
                </p>
              </CardBody>
            </Card>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: 0, opacity: 1 }}
          className="mt-12 sm:mt-14 md:mt-16"
          initial={{ y: 50, opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Card>
            <CardBody>
              <h2 className="text-2xl font-semibold mb-4">Hubungi Kami</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <div className="flex items-center space-x-2">
                  <MapPin className="text-[#C5A572]" />
                  <span>
                    Jl. Pangeran Jayakarta, Harapan Mulya, Kecamatan Medan
                    Satria, Kota Bekasi
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="text-[#C5A572]" />
                  <span>+62 123 4567 890</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="text-[#C5A572]" />
                  <span>info@beleowarkop.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="text-[#C5A572]" />
                  <span>Buka setiap hari: 07.00 - 22.00 WIB</span>
                </div>
              </div>
              <div className="mt-4 flex space-x-4" />
            </CardBody>
          </Card>
        </motion.div>
      </motion.div>
    </>
  );
}
