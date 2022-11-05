import Ball from "./Ball";

export default class Preview {
    private previewElement: HTMLDivElement;
    private previewedBalls: Ball[] = [];
    constructor() {
        this.previewElement = document.getElementById("preview") as HTMLDivElement;
    }

    renderPreview = (): void => {
        this.previewedBalls.forEach((ball, index) => {
            // console.log(ball);
            const div = this.previewElement.children[index];
            div.innerHTML = '';
            div.appendChild(ball.toHTMLElement());
        })
    }

    changePreview = (balls: Ball[]): void => {
        this.previewedBalls = balls;
        this.renderPreview();
    }
}