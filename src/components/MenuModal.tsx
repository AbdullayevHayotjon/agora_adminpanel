import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const menuTypes = [
  "Asosiy taom",
  "Salat",
  "Ichimlik",
  "Desert",
  "Sho'rva",
  "Snacks"
];

export function MenuModal({ isOpen, onClose, onSubmit, editData }) {
  const [formData, setFormData] = useState({
    nameUz: "",
    nameRu: "",
    nameEn: "",
    descriptionUz: "",
    descriptionRu: "",
    descriptionEn: "",
    price: "",
    image: "",
    type: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    if (editData) {
      setFormData({
        nameUz: editData.nameUz || "",
        nameRu: editData.nameRu || "",
        nameEn: editData.nameEn || "",
        descriptionUz: editData.descriptionUz || "",
        descriptionRu: editData.descriptionRu || "",
        descriptionEn: editData.descriptionEn || "",
        price: editData.price?.toString() || "",
        image: editData.image || "",
        type: editData.type || ""
      });
    } else {
      setFormData({
        nameUz: "",
        nameRu: "",
        nameEn: "",
        descriptionUz: "",
        descriptionRu: "",
        descriptionEn: "",
        price: "",
        image: "",
        type: ""
      });
    }
  }, [editData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.nameUz || !formData.nameRu || !formData.nameEn || !formData.price || !formData.type) {
      toast({
        title: "Xato",
        description: "Barcha majburiy maydonlarni to'ldiring",
        variant: "destructive",
      });
      return;
    }

    const submitData = {
      ...formData,
      price: parseInt(formData.price),
      image: formData.image || "/placeholder.svg"
    };

    onSubmit(submitData);

    toast({
      title: "Muvaffaqiyatli",
      description: editData ? "Menyu yangilandi" : "Yangi menyu qo'shildi",
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editData ? "Menyuni tahrirlash" : "Yangi menyu qo'shish"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Menyu turi <span className="text-red-500">*</span></Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Menyu turini tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {menuTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Narxi (so'm) <span className="text-red-500">*</span></Label>
              <Input
                id="price"
                type="number"
                placeholder="Narxini kiriting..."
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Nomlar</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nameUz">O'zbek tilida <span className="text-red-500">*</span></Label>
                <Input
                  id="nameUz"
                  placeholder="Nomini kiriting..."
                  value={formData.nameUz}
                  onChange={(e) => handleInputChange("nameUz", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nameRu">Rus tilida <span className="text-red-500">*</span></Label>
                <Input
                  id="nameRu"
                  placeholder="Введите название..."
                  value={formData.nameRu}
                  onChange={(e) => handleInputChange("nameRu", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nameEn">Ingliz tilida <span className="text-red-500">*</span></Label>
                <Input
                  id="nameEn"
                  placeholder="Enter name..."
                  value={formData.nameEn}
                  onChange={(e) => handleInputChange("nameEn", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tavsiflar</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="descriptionUz">O'zbek tilida</Label>
                <Textarea
                  id="descriptionUz"
                  placeholder="Tavsif yozishingiz mumkin..."
                  value={formData.descriptionUz}
                  onChange={(e) => handleInputChange("descriptionUz", e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descriptionRu">Rus tilida</Label>
                <Textarea
                  id="descriptionRu"
                  placeholder="Вы можете ввести описание..."
                  value={formData.descriptionRu}
                  onChange={(e) => handleInputChange("descriptionRu", e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descriptionEn">Ingliz tilida</Label>
                <Textarea
                  id="descriptionEn"
                  placeholder="You can enter a description..."
                  value={formData.descriptionEn}
                  onChange={(e) => handleInputChange("descriptionEn", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Rasm yuklash <span className="text-red-500">*</span></Label>
            <Input
              id="image"
              type="file"
              accept=".jpg,.png"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const imageUrl = URL.createObjectURL(file); // vaqtinchalik ko‘rsatish uchun
                  handleInputChange("image", imageUrl);
                }
              }}
              required
            />
            <p className="text-sm text-muted-foreground">
              Faqat PNG yoki JPG formatda
            </p>
            {formData.image && (
              <img
                src={formData.image}
                alt="Tanlangan rasm"
                className="mt-2 w-32 h-32 object-cover rounded"
              />
            )}
          </div>


          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Bekor qilish
            </Button>
            <Button type="submit">
              {editData ? "Yangilash" : "Qo'shish"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}