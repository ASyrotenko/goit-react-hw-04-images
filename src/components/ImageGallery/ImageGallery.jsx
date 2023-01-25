import { ThreeDots } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './image-gallery.module.css';

const ImageGallery = ({ loadingStatus, ...allyProps }) => {
  return (
    <>
      <ul className={css.ImageGallery}>
        <ImageGalleryItem {...allyProps} />
      </ul>
      {loadingStatus && (
        <div className={css.loading}>
          <ThreeDots color="grey" />
        </div>
      )}
    </>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  loadingStatus: PropTypes.bool,
};
