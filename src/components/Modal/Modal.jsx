import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.querySelector('body').classList.add('modalOpen');
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.querySelector('body').classList.remove('modalOpen');
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div className={css.Overlay} onClick={this.handleBackDropClick}>
        <div className={css.Modal}>
          <img src={this.props.url} alt={this.props.alt} />
        </div>
      </div>
    );
  }
}

export default Modal;

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  alt: PropTypes.string,
};
