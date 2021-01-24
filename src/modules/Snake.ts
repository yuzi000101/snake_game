/* 
    蛇类
*/
class Snake {
    element: HTMLElement  // 外部容器
    head: HTMLElement   // 蛇头
    bodies: HTMLCollection  // 蛇身

    constructor() {
        this.element = document.getElementById('snake')!  
        this.head = this.element.querySelector('#snake > div') as HTMLElement
        this.bodies = this.element.getElementsByTagName('div')
    }

    get X() {
        return this.head.offsetLeft
    }
    get Y() {
        return this.head.offsetTop
    }
    set X(value: number) {
        if (this.X === value) { return }
        // 检测是否撞墙
        if (value < 0 || value > 290) {
            throw new Error('GAME OVER!!!')
        }

        // 处理水平调头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            if (value > this.X) {  // 左走右调头
                value = this.X - 10
            } else { // 右走左调头
                value = this.X + 10
            }
        }

        this.moveBody()

        this.head.style.left = `${value}px`
        this.checkHeadBody(this.X, this.Y)
    }
    set Y(value: number) {
        if (this.Y === value) { return }
        // 检测是否撞墙
        if (value < 0 || value > 290) {
            throw new Error('GAME OVER!!!')
        }

        // 处理垂直调头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            if (value > this.Y) {  // 上走下调头
                value = this.Y - 10
            } else { // 下走上调头
                value = this.Y + 10
            }
        }

        this.moveBody()

        this.head.style.top = `${value}px`
        this.checkHeadBody(this.X, this.Y)
    }

    // 添加身体
    addBody() {
        this.element.insertAdjacentHTML('beforeend', '<div></div>')  // 在结束标签之前添加
    }

    // 蛇身移动
    moveBody() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            (this.bodies[i] as HTMLElement).style.left = (this.bodies[i - 1] as HTMLElement).offsetLeft + 'px';
            (this.bodies[i] as HTMLElement).style.top = (this.bodies[i - 1] as HTMLElement).offsetTop + 'px'
        }
    }

    //检测是否头身碰撞
    checkHeadBody(X: number, Y: number) {
        for (let i = 4; i < this.bodies.length; i++) {
            if (X === (this.bodies[i] as HTMLElement).offsetLeft && Y === (this.bodies[i] as HTMLElement).offsetTop) {
                throw new Error('commit suicide!!!')
            }
        }
    }

}

export default Snake