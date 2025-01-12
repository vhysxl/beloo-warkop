import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Navigation from "@/components/navbar";
import Footer from "@/components/footer";
import { User } from "@/types/user";

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<User | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState<Partial<User>>({
    email: "",
    nama: "",
    telepon: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      if (!session?.user?.id) return;
      const response = await fetch(`/api/profile/${session.user.id}`);
      const data = await response.json();

      setUserData(data);
      setFormData({
        email: data.email || "",
        nama: data.nama || "",
        telepon: data.telepon || "",
      });
    };

    getUserData();
  }, [session]);

  const validateInput = (email: string, telepon: string): boolean => {
    if (!email) {
      setError("Email is required");

      return false;
    }

    if (!telepon) {
      setError("Phone number is required");

      return false;
    }

    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const cleanPhone = telepon.replace(/^0+/, "");

    const validEmail = emailRegex.test(email);
    const validPhone = phoneRegex.test(`+62${cleanPhone}`);

    if (!validEmail) {
      setError("Email tidak valid");

      return false;
    }

    if (!validPhone) {
      setError("Telepon tidak valid");

      return false;
    }

    setError(null);

    return true;
  };

  const handleSubmit = async () => {
    const isValid = validateInput(formData?.email!, formData?.telepon!);

    if (!isValid) {
      return;
    }

    const response = await fetch(`/api/profile/${session?.user?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(`${data.error}`);
    }

    if (response.ok) {
      onclose;
      resetFormData();
      window.location.reload();
    }
  };

  useEffect(() => {
    if (!session) {
      router.push("/account/login");
    }
  }, [session]);

  const resetFormData = () => {
    setFormData({
      email: userData?.email || "",
      nama: userData?.nama || "",
      telepon: userData?.telepon || "",
    });
  };

  return (
    <>
      <div className="min-h-screen">
        <Navigation />
        <main>
          <div className="relative">
            <div className="container mx-auto px-4">
              <div className="mt-12">
                <Card className="rounded-lg shadow-lg p-6">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                      <h1 className="text-2xl font-bold">
                        {userData?.nama || session?.user?.name}
                      </h1>
                      <p>{userData?.email || session?.user?.email}</p>
                      <div className="mt-4 space-x-2">
                        <Button color="warning" onPress={onOpen}>
                          Edit Profile
                        </Button>
                        <Modal
                          hideCloseButton={true}
                          isOpen={isOpen}
                          placement="top-center"
                          onOpenChange={onOpenChange}
                        >
                          <ModalContent>
                            {(onclose) => (
                              <>
                                <ModalHeader className="flex flex-col gap-1 mx-auto">
                                  Edit Profile
                                </ModalHeader>
                                <ModalBody>
                                  <Input
                                    label="Email"
                                    placeholder={
                                      userData?.email || "Masukan Email"
                                    }
                                    value={formData?.email}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        email: e.target.value,
                                      })
                                    }
                                  />
                                  <Input
                                    label="Nama"
                                    placeholder={
                                      userData?.nama || "Masukan Nama"
                                    }
                                    value={formData?.nama}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        nama: e.target.value,
                                      })
                                    }
                                  />
                                  <Input
                                    label="Telepon"
                                    placeholder={
                                      userData?.telepon || "Masukan Telepon"
                                    }
                                    value={formData?.telepon}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        telepon: e.target.value,
                                      })
                                    }
                                  />
                                  {error && (
                                    <p className="text-red-500">{error}</p>
                                  )}
                                  <ModalFooter>
                                    <Button
                                      color="danger"
                                      variant="flat"
                                      onPress={() => {
                                        onclose();
                                        resetFormData();
                                      }}
                                    >
                                      Close
                                    </Button>
                                    <Button
                                      color="warning"
                                      onPress={() => {
                                        handleSubmit();
                                      }}
                                    >
                                      Simpan
                                    </Button>
                                  </ModalFooter>
                                </ModalBody>
                              </>
                            )}
                          </ModalContent>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardBody>
                  <h2 className="text-xl font-semibold mb-4">
                    Profile Information
                  </h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium opacity-70">
                          Full Name
                        </p>
                        <p className="mt-1">
                          {userData?.nama || session?.user?.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium opacity-70">Email</p>
                        <p className="mt-1">
                          {userData?.email || session?.user?.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium opacity-70 ">Phone</p>
                        <p
                          className={`mt-1 ${userData?.telepon ? "" : "text-danger font-bold"}`}
                        >
                          {userData?.telepon || "Nomor Telepon belum di set!"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-[#C5A572]">
                <CardBody>
                  <h2 className="text-xl font-semibold mb-4">Membership</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm opacity-80">Member Since</p>
                      <p className="font-bold text-lg py-2">
                        {userData?.created_at
                          ? new Date(userData.created_at).toLocaleDateString()
                          : ""}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
