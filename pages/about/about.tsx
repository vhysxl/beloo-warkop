import {
  Card,
  CardBody,
  Image,
  Accordion,
  AccordionItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

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
              src="https://sl.combot.org/niggawhati0_by_fstikbot/webp/1xf09f8c9f.webp"
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
                <h2 className="text-2xl font-semibold mb-4">Cerita Kami</h2>
                <p className="mb-4">k0P1 3N4k Kh4s JOMOKERTO</p>
              </CardBody>
            </Card>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: 0, opacity: 1 }}
          className="mt-12 sm:mt-14 md:mt-16"
          initial={{ y: 50, opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Accordion variant="splitted">
            <AccordionItem key="1" aria-label="Apalah1" title="Apalah 1">
              <p>Ciye kepo</p>
            </AccordionItem>
            <AccordionItem key="2" aria-label="Apalah2" title="Apalah 2">
              <p>Gada apa2 cok</p>
            </AccordionItem>
          </Accordion>
        </motion.div>

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
                    Satria, Kota Bekasi, Jawa Barat 17143
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
              <div className="mt-4 flex space-x-4">
                <Popover placement="bottom">
                  <PopoverTrigger>
                    <Button className="bg-[#C5A572]" color="primary">
                      Ikuti Kami
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="flex items-center space-x-2 mb-2">
                        <Instagram className="text-[#C5A572]" />
                        <p className="hover:underline">@beleowarkop</p>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Facebook className="text-[#C5A572]" />
                        <p className="hover:underline">Beloo Warkop</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Twitter className="text-[#C5A572]" />
                        <p className="hover:underline">@BeleoWarkop</p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </motion.div>
    </>
  );
}
