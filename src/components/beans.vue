<script lang="ts">
export interface Task {
  text: string;
  date: string;
  reminder: boolean;
  category: string;
  id: number;
}
export interface Category {
  id: number;
  name: string;
}
</script>