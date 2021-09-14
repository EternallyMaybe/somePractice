<template>
    <div class="carousel" :style="styles">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Carousel extends Vue {
    @Prop({ type: Object })
    options: any;

    height: number = 100;
    itemWidth: number = 150;
    itemHeight: number = 100;
    isCenterDisplay: boolean = false;
    initialIndex: number = 0;
    gap: number = 10;
    autoplay: boolean = false;
    interval: number = 3000;
    speed: number = 300;

    activeIndex: number = 0;
    timer: number;
    items: any[] = [];

    get styles() {
        return {
            height: `${this.height}px`,
        };
    }

    @Watch('options')
    handleOptionsChange() {
        Object.assign(this, this.options);
        this.init();
    }

    updateItems() {
        this.items = this.$children.filter(child => child.$options.name === 'CarouselItem');
    }

    resetItemsStyle() {
        this.items.forEach(item => item.updateStyle({
            itemWidth: this.itemWidth,
            itemHeight: this.itemHeight,
            isCenterDisplay: this.isCenterDisplay,
            gap: this.gap,
            speed: this.speed,
        }));
    }

    resetItemPosition(direction = 1, initial = false) {
        this.items && this.items.forEach((item, index) => {
            let animated = !initial;
            if ((direction < 0 && item.isLastChild) || (direction > 0 && item.isFirstChild)) {
                animated = false;
            }
            item.translateItem(index, this.activeIndex, animated);
        });
    }

    setActiveItem(index: number, direction: number) {
        const len = this.items.length;
        let activeIndex = index;
        if (direction > 0 && activeIndex >= len) {
            activeIndex = 0;
        }
        if (direction < 0 && activeIndex < 0) {
            activeIndex = len - 1;
        }
        this.activeIndex = activeIndex;
        this.resetItemPosition(direction);
    }

    slide(direction = 1) {
        if (direction !== -1 && direction !== 1) {
            console.warn('The value of direction can only be -1 or 1!');
            return;
        }
        this.setActiveItem(this.activeIndex + direction, direction);
    }

    startTimer() {
        if (!this.interval || !this.autoplay) {
            return;
        }
        this.timer = window.setTimeout(() => {
            this.slide();
            this.stopTimer();
            this.startTimer();
        }, this.interval);
    }

    stopTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = -1;
        }
    }

    init() {
        if (!this.$children || this.$children.length <= 0) {
            return;
        }
        this.activeIndex = this.initialIndex;
        this.updateItems();
        this.resetItemsStyle();
        this.resetItemPosition(1, true);
        this.stopTimer();
        this.startTimer();
    }

    mounted() {
        Object.assign(this, this.options);
        setTimeout(() => {
            this.init();
        }, 0);
    }

    updated() {
        this.init();
    }

    destroyed() {
        this.stopTimer();
    }
}
</script>
<style scoped>
.carousel {
    overflow: hidden;
    display: flex;
    align-items: center;
    position: relative;
}
</style>
