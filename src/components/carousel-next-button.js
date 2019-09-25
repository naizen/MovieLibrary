import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

export default class CarouselNextButton extends React.Component {
  constructor() {
    super(...arguments);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    event.preventDefault();
    this.props.nextSlide();
  }
  render() {
    const disabled =
      this.props.currentSlide + this.props.slidesToShow >=
        this.props.slideCount && !this.props.wrapAround;
    return (
      <button
        className="carousel-nav-btn"
        disabled={disabled}
        onClick={this.handleClick}
      >
        <FaChevronRight size={20} />
      </button>
    );
  }
}
