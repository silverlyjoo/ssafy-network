<template>
  <div id="Project">
    <ProjectList></ProjectList>
  </div>
</template>

<script>
import ProjectList from "@/components/Project/ProjectList";
import FirebaseService from '@/services/FirebaseService';

export default {
  name: "Project",
  components: {
    ProjectList
  },
  mounted() {
		FirebaseService.SendLog("ProjectPage");
	}
};
</script>
