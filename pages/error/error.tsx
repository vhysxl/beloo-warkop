import { useRouter } from 'next/navigation'
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react"
import { motion } from "framer-motion"

export default function Error() {
    const router = useRouter()
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="w-full max-w-md">
                    <CardHeader className="flex flex-col items-center pb-0 pt-6 px-4">
                        <h1 className="text-2xl font-bold text-red-600">Oops! Terjadi Kesalahan</h1>
                    </CardHeader>
                    <CardBody className="px-6 py-4">
                        <p className="text-center mb-4">
                            Sepertinya email ini telah terdaftar bukan dengan Google, silakan login ulang dengan password.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Button
                                color="primary"
                                onClick={() => router.push('/account/login')}
                                className="bg-[#C5A572] text-white"
                            >
                                Kembali ke Login
                            </Button>

                        </div>
                    </CardBody>
                </Card>
            </motion.div>
        </div>
    )
}