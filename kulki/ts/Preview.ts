import Ball from "./Ball";

export default class Preview {
    private previewElement: HTMLDivElement;
    private previewedBalls: Ball[] = [];
    constructor() {
        this.previewElement = document.getElementById("preview") as HTMLDivElement;
        this.previewElement.innerText = "next:";
    }

    renderPreview = (): void => {
        this.previewedBalls.forEach((ball, index) => {
            this.previewElement.childNodes[index].appendChild(ball.toHTMLElement());
        })
    }

    changePreview = (balls: Ball[]): void => {
        this.previewedBalls = balls;
        this.renderPreview();
    }
}