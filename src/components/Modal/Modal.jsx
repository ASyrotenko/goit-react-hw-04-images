// import { Component } from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import css from './modal.module.css';

export default function Modal({ url, closeModal, alt }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    // document.querySelector('body').classList.add('modalOpen');
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // document.querySelector('body').classList.remove('modalOpen');
    };
  }, [closeModal]);

  const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleBackDropClick}>
      <div className={css.Modal}>
        <img src={url} alt={alt} />
      </div>
    </div>
  );
}

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//     document.querySelector('body').classList.add('modalOpen');
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//     document.querySelector('body').classList.remove('modalOpen');
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.closeModal();
//     }
//   };

//   handleBackDropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.closeModal();
//     }
//   };

//   render() {
//     return (
//       <div className={css.Overlay} onClick={this.handleBackDropClick}>
//         <div className={css.Modal}>
//           <img src={this.props.url} alt={this.props.alt} />
//         </div>
//       </div>
//     );
//   }
// }

// export default Modal;

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  alt: PropTypes.string,
};
