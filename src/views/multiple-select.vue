<template>
	<ComPage>
		<ul>
			<li
				class="item"
				v-for="(item, index) in list"
				:key="index"
				@click="handleClick(index)"
				:class="activeCls(index)"
				>
				{{item.name}}
			</li>
		</ul>
	</ComPage>
</template>

<script>
export default {
	name: 'selectActive',
	data () {
		return {
			list: [
				{ name: 'zs' },
				{ name: 'ls' },
				{ name: 'ww' },
				{ name: 'zl' }
			],
			selectKeys: [0]
		}
	},
	methods: {
		handleClick(current) {
			if (this.selectKeys.indexOf(current) >= 0) {
				this.selectKeys = this.selectKeys.filter(v => v !== current)
			} else {
				this.selectKeys = [...this.selectKeys, current]
			}
		},
		activeCls(index) {
			return this.selectKeys.some(v => v === index) ? 'active' : ''
		},
		onBack() {
			console.log('back')
		}
	}
}
</script>

<style scoped>
	.item {
		padding: 10px;
		margin-top: 10px;
		border: 1px solid #eee;
	}
	.active {
		border-color: #f00;
	}
</style>
