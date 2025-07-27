import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

export function DeleteConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  description, 
  itemDetails = [] 
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription className="text-left">
            {description}
          </DialogDescription>
        </DialogHeader>

        {itemDetails.length > 0 && (
          <div className="space-y-3 py-4">
            <h4 className="font-semibold text-sm">Ma'lumotlar:</h4>
            <div className="space-y-2">
              {itemDetails.map((detail, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="font-medium text-muted-foreground">{detail.label}:</span>
                  <span className="text-right max-w-[200px] truncate">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Bekor qilish
          </Button>
          <Button type="button" variant="destructive" onClick={onConfirm}>
            O'chirish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}