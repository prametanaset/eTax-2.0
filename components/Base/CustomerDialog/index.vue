<script setup lang="ts">
import { ref } from "vue";
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import {
  MailIcon, Phone, CheckCircle, Landmark, MapPin, Trash2,
} from "lucide-vue-next";

const open = ref(false);

const defaultImage = "https://i.pravatar.cc/100?img=3";
const profileImageUrl = ref<string>(defaultImage);

const customer = ref({
  firstName: "Sienna",
  lastName: "Hewitt",
  email: "siennahewitt@gmail.com",
  phone: "",
  tin: "",
  address: "",
  country: "Thailand",
  username: "siennahewitt",
});

function handleImageUpload(e: Event) {
  const file = (e.target as HTMLInputElement)?.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      profileImageUrl.value = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

function resetImage() {
  profileImageUrl.value = defaultImage;
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button>เพิ่มลูกค้า</Button>
    </DialogTrigger>

    <DialogContent class="max-w-[640px] rounded-xl">
      <DialogHeader>
        <DialogTitle>เพิ่มลูกค้าใหม่</DialogTitle>
      </DialogHeader>

      <!-- รูปโปรไฟล์ -->
      <div class="flex items-center gap-4">
        <div class="relative group">
          <label for="upload-profile">
            <img
              :src="profileImageUrl"
              class="w-16 h-16 rounded-full object-cover border cursor-pointer hover:opacity-80 transition"
            />
            <input
              id="upload-profile"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleImageUpload"
            />
          </label>
          <button
            v-if="profileImageUrl !== defaultImage"
            @click="resetImage"
            class="absolute -top-2 -right-2 bg-white border rounded-full p-1 hover:bg-red-50"
          >
            <Trash2 class="w-4 h-4 text-red-500" />
          </button>
        </div>
        <div class="flex-1">
          <h2 class="text-lg font-semibold">
            {{ customer.firstName || "ชื่อ" }} {{ customer.lastName || "นามสกุล" }}
          </h2>
          <p class="text-sm text-muted-foreground">{{ customer.email || "อีเมล" }}</p>
        </div>
      </div>

      <!-- แบบฟอร์มพร้อม Label -->
      <div class="grid gap-4 mt-6">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <Label>ชื่อ</Label>
            <Input v-model="customer.firstName" placeholder="ชื่อ (First name)" />
          </div>
          <div>
            <Label>นามสกุล</Label>
            <Input v-model="customer.lastName" placeholder="นามสกุล (Last name)" />
          </div>
        </div>

        <div>
          <Label>อีเมล</Label>
          <div class="relative">
            <Input v-model="customer.email" placeholder="example@email.com" />
            <MailIcon class="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground" />
          </div>
          <p class="text-xs text-blue-600 flex items-center mt-1">
            <CheckCircle class="w-3 h-3 mr-1" /> VERIFIED 2 JAN, 2025
          </p>
        </div>

        <div>
          <Label>เบอร์โทร</Label>
          <div class="relative">
            <Input v-model="customer.phone" placeholder="0812345678" />
            <Phone class="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        <div>
          <Label>เลขประจำตัวผู้เสียภาษี</Label>
          <div class="relative">
            <Input v-model="customer.tin" placeholder="010xxxxxxxxxxx" />
            <Landmark class="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        <div>
          <Label>ประเทศ</Label>
          <Select v-model="customer.country">
            <SelectTrigger>
              <SelectValue placeholder="เลือกประเทศ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Thailand">🇹🇭 Thailand</SelectItem>
              <SelectItem value="United States">🇺🇸 United States</SelectItem>
              <SelectItem value="Japan">🇯🇵 Japan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>ที่อยู่</Label>
          <div class="relative">
            <Input v-model="customer.address" placeholder="กรอกที่อยู่ลูกค้า" />
            <MapPin class="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        <div>
          <Label>Username</Label>
          <div class="flex items-center">
            <span class="text-sm text-muted-foreground me-2">untitledui.com/</span>
            <Input v-model="customer.username" class="flex-1" />
            <CheckCircle class="text-blue-600 ms-2 w-4 h-4" />
          </div>
        </div>
      </div>

      <DialogFooter class="mt-6 flex justify-between">
        <Button variant="ghost">ยกเลิก</Button>
        <Button @click="() => console.log('✅ เพิ่มลูกค้า:', customer, profileImageUrl)">
          บันทึก
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
