import { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import css from './image-gallery-item.module.css';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    largeImg: '',
    largeImgAlt: '',
  };

  showModal = e => {
    this.setState({
      showModal: true,
      largeImg: e.currentTarget.dataset.url,
      largeImgAlt: e.currentTarget.alt,
    });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImg: '', largeImgAlt: '' });
  };

  render() {
    return (
      <>
        {this.props.items.map(item => (
          <li className={css.ImageGalleryItem} key={item.id}>
            <img
              name="img"
              data-url={item.largeImageURL}
              src={item.webformatURL}
              alt={item.tags}
              className={css.ImageGalleryItemImage}
              onClick={this.showModal}
            />
          </li>
        ))}
        {this.state.showModal && (
          <Modal
            url={this.state.largeImg}
            closeModal={this.closeModal}
            alt={this.state.largeImgAlt}
          />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  items: PropTypes.array,
};
