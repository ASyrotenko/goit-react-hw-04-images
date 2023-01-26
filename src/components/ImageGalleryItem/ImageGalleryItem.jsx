// import { Component } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import Modal from 'components/Modal';
import css from './image-gallery-item.module.css';

export default function ImageGalleryItem({ items }) {
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState('');
  const [largeImgAlt, setLargeImgAlt] = useState('');

  const onShowModal = e => {
    const { dataset, alt } = e.currentTarget;
    setShowModal(true);
    setLargeImg(dataset.url);
    setLargeImgAlt(alt);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImg('');
    setLargeImgAlt('');
  };

  return (
    <>
      {items.map(item => (
        <li className={css.ImageGalleryItem} key={item.id}>
          <img
            name="img"
            data-url={item.largeImageURL}
            src={item.webformatURL}
            alt={item.tags}
            className={css.ImageGalleryItemImage}
            onClick={onShowModal}
          />
        </li>
      ))}
      {showModal && (
        <Modal url={largeImg} closeModal={closeModal} alt={largeImgAlt} />
      )}
    </>
  );
}

// class ImageGalleryItem extends Component {
//   state = {
//     showModal: false,
//     largeImg: '',
//     largeImgAlt: '',
//   };

//   showModal = e => {
//     this.setState({
//       showModal: true,
//       largeImg: e.currentTarget.dataset.url,
//       largeImgAlt: e.currentTarget.alt,
//     });
//   };

//   closeModal = () => {
//     this.setState({ showModal: false, largeImg: '', largeImgAlt: '' });
//   };

//   render() {
//     return (
//       <>
//         {this.props.items.map(item => (
//           <li className={css.ImageGalleryItem} key={item.id}>
//             <img
//               name="img"
//               data-url={item.largeImageURL}
//               src={item.webformatURL}
//               alt={item.tags}
//               className={css.ImageGalleryItemImage}
//               onClick={this.showModal}
//             />
//           </li>
//         ))}
//         {this.state.showModal && (
//           <Modal
//             url={this.state.largeImg}
//             closeModal={this.closeModal}
//             alt={this.state.largeImgAlt}
//           />
//         )}
//       </>
//     );
//   }
// }

// export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  items: PropTypes.array,
};
