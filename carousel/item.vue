<template>
    <div
        class="carousel-item"
        :class="{'is-active': isActive}"
        :style="styles"
    >
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
    name: 'CarouselItem',
})
export default class CarouselItem extends Vue {
    itemWidth: number = 0;
    itemHeight: number = 0;
    gap: number = 0;
    isActive: boolean = false;
    translateX: number = 0;
    speed: number = 1000;
    isCenterDisplay: boolean = false;
    animated: boolean = true;
    isFirstChild: boolean = false;
    isLastChild: boolean = false;

    get styles() {
        return {
            marginLeft: `${this.gap / 2}px`,
            marginRight: `${this.gap / 2}px`,
            width: `${this.itemWidth}px`,
            height: `${this.itemHeight}px`,
            transform: `translateX(${this.translateX}px)`,
            transition: this.animated ? `transform ${this.speed}ms` : 'none',
        };
    }

    calcDistance({ index, activeIndex, len, leftOffset, rightOffset } : { [key: string]: number }) {
        if (index >= len) {
            return 0;
        }

        if (index < activeIndex && activeIndex - index > leftOffset) {
            return index + len - activeIndex;
        }
        if (index > activeIndex && index - activeIndex > rightOffset) {
            return index - len - activeIndex;
        }
        return index - activeIndex;
    }

    calcTranslate(index: number, activeIndex: number, len: number) {
        const parentWidth = parseInt(window.getComputedStyle(this.$parent?.$el).width, 10) || 0;
        const itemWidth = this.itemWidth + this.gap;
        const count = Number((parentWidth / itemWidth).toFixed(2));
        let leftOffset = 1;
        let offsetCount = 0;

        // item项数量小于容器可容纳数量时，左侧无item
        if (count >= len) {
            leftOffset = 0;
            this.animated = false;
        }

        // 居中显示，需要将部分item移到激活元素的左侧，并且设置偏移值，以保证激活元素居中显示
        if (this.isCenterDisplay) {
            leftOffset = Math.floor(len / 2);
            offsetCount = Number(((count - 1) / 2).toFixed(2));
        }

        // 如果设置第一个元素居中，item项数量为偶数且小于容器可容纳数量时
        // 需要再偏移0.5个item宽度，以保证这个跑马灯居中显示
        if (count >= len && this.isCenterDisplay) {
            const isEven = len % 2 === 0;
            isEven && (offsetCount += 0.5);
        }

        const rightOffset = len - 1 - leftOffset;
        const distance = this.calcDistance({
            index,
            activeIndex,
            len,
            leftOffset,
            rightOffset,
        });
        this.isFirstChild = distance === -leftOffset;
        this.isLastChild = distance === rightOffset;

        return (distance + offsetCount) * itemWidth;
    }

    translateItem(index: number, activeIndex: number, animated: boolean) {
        const len = this.$parent?.items.length;
        this.isActive = index === activeIndex;
        this.animated = animated;
        this.translateX = this.calcTranslate(index, activeIndex, len);
    }

    updateStyle(options: any) {
        Object.assign(this, options);
    }

    destroyed() {
        this.$parent?.updateItems();
    }
}
</script>
<style scoped>
.carousel-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    position: absolute;
    left: 0;
    font-size: 12px;
}
</style>
