import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MenuModal } from "@/components/MenuModal";
import { DeleteConfirmModal } from "@/components/DeleteConfirmModal";

// Mock data
const initialMenus = [
  {
    id: 1,
    nameUz: "Osh",
    nameRu: "Плов",
    nameEn: "Pilaf",
    descriptionUz: "An'anaviy o'zbek oshi",
    descriptionRu: "Традиционный узбекский плов",
    descriptionEn: "Traditional Uzbek pilaf",
    price: 35000,
    image: "/placeholder.svg",
    type: "Asosiy taom"
  },
  {
    id: 2,
    nameUz: "Achiq-chuchiq salat",
    nameRu: "Острый салат",
    nameEn: "Spicy salad",
    descriptionUz: "Achchiq va mazali salat",
    descriptionRu: "Острый и вкусный салат",
    descriptionEn: "Spicy and delicious salad",
    price: 18000,
    image: "/placeholder.svg",
    type: "Salat"
  },
  {
    id: 3,
    nameUz: "Choy",
    nameRu: "Чай",
    nameEn: "Tea",
    descriptionUz: "Issiq qora choy",
    descriptionRu: "Горячий черный чай",
    descriptionEn: "Hot black tea",
    price: 8000,
    image: "/placeholder.svg",
    type: "Ichimlik"
  }
];

const Menus = () => {
  const [menus, setMenus] = useState(initialMenus);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [deleteMenu, setDeleteMenu] = useState(null);

  const filteredMenus = menus.filter(menu =>
    menu.nameUz.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMenu = (menuData) => {
    const newMenu = {
      ...menuData,
      id: Math.max(...menus.map(m => m.id)) + 1
    };
    setMenus([...menus, newMenu]);
    setIsModalOpen(false);
  };

  const handleEditMenu = (menuData) => {
    setMenus(menus.map(menu => 
      menu.id === editingMenu.id ? { ...menuData, id: editingMenu.id } : menu
    ));
    setEditingMenu(null);
    setIsModalOpen(false);
  };

  const handleDeleteMenu = () => {
    setMenus(menus.filter(menu => menu.id !== deleteMenu.id));
    setDeleteMenu(null);
  };

  const openEditModal = (menu) => {
    setEditingMenu(menu);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingMenu(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Menyular</h1>
        <Button onClick={openAddModal}>
          <Plus className="mr-2 h-4 w-4" />
          Yangi menyu qo'shish
        </Button>
      </div>

      <div className="flex items-center mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Menyu nomini qidiring..."
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
              <TableHead>Nomi(Uz)</TableHead>
              <TableHead>Nomi(Ru)</TableHead>
              <TableHead>Nomi(En)</TableHead>
              <TableHead>Tavsif(Uz)</TableHead>
              <TableHead>Tavsif(Ru)</TableHead>
              <TableHead>Tavsif(En)</TableHead>
              <TableHead>Narxi(so'm)</TableHead>
              <TableHead>Rasm</TableHead>
              <TableHead>Turi</TableHead>
              <TableHead>Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMenus.map((menu, index) => (
              <TableRow key={menu.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{menu.nameUz}</TableCell>
                <TableCell>{menu.nameRu}</TableCell>
                <TableCell>{menu.nameEn}</TableCell>
                <TableCell className="max-w-[150px] truncate">{menu.descriptionUz}</TableCell>
                <TableCell className="max-w-[150px] truncate">{menu.descriptionRu}</TableCell>
                <TableCell className="max-w-[150px] truncate">{menu.descriptionEn}</TableCell>
                <TableCell>{menu.price.toLocaleString()}</TableCell>
                <TableCell>
                  <img src={menu.image} alt={menu.nameUz} className="w-12 h-12 object-cover rounded" />
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{menu.type}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditModal(menu)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteMenu(menu)}
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

      <MenuModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMenu(null);
        }}
        onSubmit={editingMenu ? handleEditMenu : handleAddMenu}
        editData={editingMenu}
      />

      <DeleteConfirmModal
        isOpen={!!deleteMenu}
        onClose={() => setDeleteMenu(null)}
        onConfirm={handleDeleteMenu}
        title="Menyuni o'chirish"
        description={`"${deleteMenu?.nameUz}" menyusini o'chirishni tasdiqlaysizmi?`}
        itemDetails={deleteMenu ? [
          { label: "Nomi", value: deleteMenu.nameUz },
          { label: "Narxi", value: `${deleteMenu.price.toLocaleString()} so'm` },
          { label: "Turi", value: deleteMenu.type }
        ] : []}
      />
    </div>
  );
};

export default Menus;