/* 
    计分板类
*/
class ScorePanel {
    score: number = 0
    level: number = 1

    scoreElement: HTMLElement
    levelElement: HTMLElement

    maxLevel: number // 最大等级
    levelConditon: number  //升级条件

    constructor(maxLevel: number = 10, levelCondition: number = 10) {
        this.scoreElement = document.getElementById('score')!
        this.levelElement = document.getElementById('level')!
        this.maxLevel = maxLevel
        this.levelConditon = levelCondition
    }

    // 加分
    addScore() {
        this.scoreElement.innerHTML = `SCORE: ${++this.score}`
        if (this.score % this.levelConditon === 0) {
            this.levelUp()
        }
    }

    // 升级
    levelUp() {
        if (this.level < this.maxLevel) {
            this.levelElement.innerHTML = `LEVEL: ${++this.level}`
        }
    }

}
export default ScorePanel