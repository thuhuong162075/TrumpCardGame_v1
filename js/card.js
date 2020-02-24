class Card {
	init(img) {
		let html = `<div class="card-container">
						<div class="card">
							<div class="one_face card__front">
								<img src="img/pic0.png">
							</div>
							<div class="one_face card__backside">
								<img src="${img}">
							</div>
						</div>
					</div>`;
		return html;
	}
}

export default Card;