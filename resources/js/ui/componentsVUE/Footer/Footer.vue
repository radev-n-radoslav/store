<template>
	<footer class="bg-gray-800" aria-labelledby="footer-heading">
	    <h2 id="footer-heading" class="sr-only">Footer</h2>
	    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
	        <div class="xl:grid xl:grid-cols-3 xl:gap-8">
	            <div class="space-y-8 xl:col-span-1">
	                <img class="h-10" :src="logo.url" alt="Company name" />
	                <p class="text-gray-400 text-base">{{ logo.memo }}</p>
	                <div class="flex space-x-6">
	                    <a v-for="item in socials" :key="item.name" :href="item.href" class="text-gray-400 hover:text-gray-400">
	                        <span class="sr-only">{{ item.name }}</span>
	                        <i class="h-6 w-6" :class="item.icon" aria-hidden="true"></i>
	                    </a>
	                </div>
	            </div>
	            <div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 xl:mt-0 col-span-6 xl:col-span-2">
	                <div class="md:gap-8" v-for="column in navigation" :key="column.title">
	                    <div>
	                        <h3 class="text-base font-medium text-white">{{ column.title }}</h3>
	                        <ul role="list" class="mt-4 space-y-4">
	                            <li v-for="link in column.links" :key="link.name">
	                                <a :href="link.href" class="text-base text-gray-400 hover:text-white">
	                                	{{ link.name }}
	                                </a>
	                            </li>
	                        </ul>
	                    </div>
	                </div>
	            </div>
	        </div>
	        <div class="mt-12 pt-8">
	            <div class="grid grid-cols-12">
	            	<div class="col-span-12 md:col-span-10">
	            		<p class="text-bold text-white text-left">
	            			При възникнало съмнение за здравословен проблем или нужда от лечение, моля винаги се обръщайте за медицинска консултация към квалифициран и правоспособен лекар или фармацевт. В никакъв случай не възприемайте дадената Ви чрез сайта информация като абсолютно достоверна и правилна, дори и същата да се окаже такава.
	            		</p>
	            	</div>
	            	<div class="col-span-12 md:col-span-2 mx-auto">
	            		<a href="http://www.bda.bg/images/stories/documents/registers/Spisak_LP_Internet%20apteki-%D0%B0%D0%BA%D1%82%D1%83%D0%B0%D0%BB%D0%B5%D0%BD.xls">
							<img src="https://www.afya-pharmacy.bg/images/legal.jpg" class="img-fluid" style="height: 100px">
						</a>
	            	</div>
	            </div>
	        </div>
	        <div class="mt-12 border-t border-gray-200 pt-8">
	            <p class="text-base text-gray-400 xl:text-center">&copy; 2020 Workflow, Inc. All rights reserved.</p>
	        </div>
	    </div>
	</footer>
</template>

<script>
	import { ref } from 'vue'

	export default {
		name: 'Footer',

		components: {

		},

		props: {
			logo: Object,
			staticData: Object
		},

		setup(props){
			const logo = ref(props.logo);
			const socials = ref(props.staticData.socials);
			const navigation = ref(props.staticData.navigation);
			
			return {
				logo,
				socials,
				navigation
			};
		}
	}
</script>