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
import { useToast } from "@/hooks/use-toast";

export function AdModal({ isOpen, onClose, onSubmit, editData }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    media: "",
    mediaType: "image",
    isActive: true
  });
  const { toast } = useToast();

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || "",
        description: editData.description || "",
        media: editData.media || "",
        mediaType: editData.mediaType || "image",
        isActive: editData.isActive !== undefined ? editData.isActive : true
      });
    } else {
      setFormData({
        name: "",
        description: "",
        media: "",
        mediaType: "image",
        isActive: true
      });
    }
  }, [editData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.media) {
      toast({
        title: "Xato",
        description: "Nom va media ma'lumotlarini to'ldiring",
        variant: "destructive",
      });
      return;
    }

    const submitData = {
      ...formData,
      media: formData.media || "/placeholder.svg"
    };

    onSubmit(submitData);

    toast({
      title: "Muvaffaqiyatli",
      description: editData ? "Reklama yangilandi" : "Yangi reklama qo'shildi",
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editData ? "Reklamani tahrirlash" : "Yangi reklama qo'shish"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Reklama nomi <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              placeholder="Nomini kiriting..."
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Tavsif</Label>
            <Textarea
              id="description"
              placeholder="Tavsif yozishingiz mumkin..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="media">
              Media yuklash <span className="text-red-500">*</span>
            </Label>
            <Input
              id="media"
              type="file"
              accept=".jpg,.png,.mp4"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const mediaUrl = URL.createObjectURL(file);
                  const fileType = file.type;

                  // Rasmmi yoki videomi ekanligini aniqlaymiz
                  let mediaType = "";
                  if (fileType.startsWith("image/")) {
                    mediaType = "image";
                  } else if (fileType.startsWith("video/")) {
                    mediaType = "video";
                  }

                  // Formani yangilash funksiyasi
                  handleInputChange("media", mediaUrl);
                  handleInputChange("mediaType", mediaType);
                }
              }}
              required
            />
            <p className="text-sm text-muted-foreground">
              Faqat PNG, JPG yoki MP4 formatda
            </p>

            {formData.media && (
              <>
                {formData.mediaType === "image" ? (
                  <img
                    src={formData.media}
                    alt="Tanlangan rasm"
                    className="mt-2 w-32 h-32 object-cover rounded"
                  />
                ) : (
                  <video
                    src={formData.media}
                    controls
                    className="mt-2 w-48 h-32 object-cover rounded"
                  />
                )}
              </>
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