<template>
  <div class="flex gap-3 flex-wrap">
    <Card
      v-for="file in files"
      :key="file.filename"
      class="p-2 hover:bg-primary-500/30 cursor-pointer transition-all items-center w-[15rem]"
      @click="downloadFile({ filename: file.filename, data: file.file.data })"
    >
      <div class="mb-3">
        <template v-if="isImage(file.filename)">
          <img
            v-if="isImage(file.filename)"
            :src="imageSrc(file)"
            class="w-full h-20 object-top object-cover rounded"
            alt="preview"
          />
        </template>
      </div>
      <!-- ถ้าเป็นรูปภาพ แสดง thumbnail -->
      <div class="flex gap-2">
        <Card class="bg-primary-500 p-2 border-0 text-white font-bold">
          {{ fileExtension(file.filename) }}
        </Card>

        <div class="flex flex-col w-full overflow-hidden">
          <span class="w-full truncate font-semibold text-sm">
            {{ file.filename }}
          </span>
          <span class="text-xs">{{ formatBytes(file.file.size) }}</span>
        </div>

        <Button size="sm"><ArrowDownToLine /></Button>
      </div>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDownToLine } from "lucide-vue-next";

const { downloadFile, imageSrc } = useGmailService();

interface FileItem {
  filename: string;
  file: {
    data: string;
    size: number;
  };
}

const props = defineProps<{
  files: FileItem[];
}>();

function fileExtension(filename: string): string {
  const parts = filename.split(".");
  return parts.length > 1 ? `${parts.pop()?.toUpperCase()}` : "unknown";
}

function isImage(filename: string): boolean {
  const imageExts = ["jpg", "jpeg", "png", "webp", "gif"];
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  return imageExts.includes(ext);
}
</script>
