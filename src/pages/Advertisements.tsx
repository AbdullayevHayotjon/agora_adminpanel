import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdModal } from "@/components/AdModal";
import { DeleteConfirmModal } from "@/components/DeleteConfirmModal";

// Mock data
const initialAds = [
  {
    id: 1,
    name: "Yangi menyu taklifi",
    description: "Bizning yangi taomlarimizni sinab ko'ring! 20% chegirma",
    media: "/placeholder.svg",
    mediaType: "image",
    isActive: true
  },
  {
    id: 2,
    name: "Dam olish kunlari aktsiyasi",
    description: "Shanba va yakshanba kunlari barcha ichimliklar 15% chegirma",
    media: "/placeholder.svg",
    mediaType: "image",
    isActive: false
  },
  {
    id: 3,
    name: "Tug'ilgan kun taklifi",
    description: "Tug'ilgan kuningizni biz bilan nishonlang! Maxsus chegirmalar",
    media: "/placeholder.svg",
    mediaType: "video",
    isActive: true
  }
];

const Advertisements = () => {
  const [ads, setAds] = useState(initialAds);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [deleteAd, setDeleteAd] = useState(null);

  const filteredAds = ads.filter(ad =>
    ad.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAd = (adData) => {
    const newAd = {
      ...adData,
      id: Math.max(...ads.map(a => a.id)) + 1
    };
    setAds([...ads, newAd]);
    setIsModalOpen(false);
  };

  const handleEditAd = (adData) => {
    setAds(ads.map(ad =>
      ad.id === editingAd.id ? { ...adData, id: editingAd.id } : ad
    ));
    setEditingAd(null);
    setIsModalOpen(false);
  };

  const handleDeleteAd = () => {
    setAds(ads.filter(ad => ad.id !== deleteAd.id));
    setDeleteAd(null);
  };

  const toggleAdStatus = (id) => {
    setAds(ads.map(ad =>
      ad.id === id ? { ...ad, isActive: !ad.isActive } : ad
    ));
  };

  const openEditModal = (ad) => {
    setEditingAd(ad);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingAd(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Reklamalar</h1>
        <Button onClick={openAddModal}>
          <Plus className="mr-2 h-4 w-4" />
          Yangi reklama qo'shish
        </Button>
      </div>

      <div className="flex items-center mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Reklama nomini qidiring..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Nomi</TableHead>
              <TableHead>Tavsif</TableHead>
              <TableHead>Media</TableHead>
              <TableHead>Holati</TableHead>
              <TableHead>Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAds.map((ad, index) => (
              <TableRow key={ad.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{ad.name}</TableCell>
                <TableCell className="max-w-[200px] truncate">{ad.description}</TableCell>
                <TableCell>
                  {ad.mediaType === "image" ? (
                    <img src={ad.media} alt={ad.name} className="w-12 h-12 object-cover rounded" />
                  ) : (
                    <video src={ad.media} className="w-12 h-12 object-cover rounded" />
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={ad.isActive}
                      onCheckedChange={() => toggleAdStatus(ad.id)}
                    />
                    <span className={ad.isActive ? "text-green-600" : "text-red-600"}>
                      {ad.isActive ? "Faol" : "NoFaol"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditModal(ad)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteAd(ad)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AdModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAd(null);
        }}
        onSubmit={editingAd ? handleEditAd : handleAddAd}
        editData={editingAd}
      />

      <DeleteConfirmModal
        isOpen={!!deleteAd}
        onClose={() => setDeleteAd(null)}
        onConfirm={handleDeleteAd}
        title="Reklamani o'chirish"
        description={`"${deleteAd?.name}" reklamasini o'chirishni tasdiqlaysizmi?`}
        itemDetails={deleteAd ? [
          { label: "Nomi", value: deleteAd.name },
          { label: "Tavsif", value: deleteAd.description },
          { label: "Holati", value: deleteAd.isActive ? "Faol" : "NoFaol" }
        ] : []}
      />
    </div>
  );
};

export default Advertisements;
