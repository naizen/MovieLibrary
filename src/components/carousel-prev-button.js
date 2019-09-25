import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';

export default class CarouselPrevButton extends React.Component {
  constructor() {
    super(...arguments);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    event.preventDefault();
    this.props.previousSlide();
  }
  render() {
    const disabled =
      (this.props.currentSlide === 0 && !this.props.wrapAround) ||
      this.props.slideCount === 0;
    return (
      <button
        className="carousel-nav-btn"
        disabled={disabled}
        onClick={this.handleClick}
      >
        <FaChevronLeft size={20} />
      </button>
    );
  }
}
