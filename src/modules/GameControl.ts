/* 
    总控制类
*/
import Snake from './Snake'
import Food from './Food'
import ScorePanel from './ScorePanel'

class GameControl {
    snake: Snake
    food: Food
    scorePanel: ScorePanel

    direction: string = ''
    isLive: boolean = true

    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel()
        this.init()
    }
    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        this.run()
    }
    keydownHandler(event: KeyboardEvent) {
        this.direction = event.key
        event.preventDefault()
    }
    // 蛇的移动方法
    run() {
        let X = this.snake.X
        let Y = this.snake.Y
        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y -= 10
                break
            case 'ArrowDown':
            case 'Down':
                Y += 10
                break
            case 'ArrowLeft':
            case 'Left':
                X -= 10
                break
            case 'ArrowRight':
            case 'Right':
                X += 10
                break
        }

        this.checkEat(X, Y) // 检查是否吃到食物

        // 异常捕获（头身碰撞 / 撞墙）
        try {
            this.snake.X = X
            this.snake.Y = Y
        } catch (err) {
            this.isLive = false
            alert(err.message)
        }
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
        
    }

    // 检测是否吃到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            this.food.chang()
            this.snake.addBody()
            this.scorePanel.addScore()
        }
    }
}

export default GameControl