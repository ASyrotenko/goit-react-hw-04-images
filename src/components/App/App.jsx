// import { Component } from 'react';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import css from './app.module.css';

import { getImages } from '../utils/api';
import { smoothScroll } from 'components/utils/smoothScroll';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [noResult, setNoResult] = useState(false);

  useEffect(() => {
    getImages(query, page, setLoadingStatus, onSearch);
    smoothScroll(page);
  }, [query, page]);

  const handleFormSubmit = value => {
    if (query === value) {
      return alert('Please enter a new search value');
    }
    setItems([]);
    setQuery(value);
    setPage(1);
    setNoResult(false);
  };

  const onSearch = (response, totalItems) => {
    setItems(prevState => [...prevState, ...response]);
    setTotalItems(totalItems);

    if (response.length === 0) {
      setNoResult(true);
    }
  };

  const handleOnLoadMoreClick = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      <Searchbar onSubmit={handleFormSubmit} />
      <main>
        {noResult && (
          <p className={css.noFoundText}>
            Sorry. There is no images for <b>{query}</b>
          </p>
        )}
        <ImageGallery items={items} loadingStatus={loadingStatus} />
        {items.length > 0 && items.length < totalItems && (
          <Button onClick={handleOnLoadMoreClick} />
        )}
        {items.length > 0 && items.length >= totalItems && (
          <p className={css.endMessage}>
            Sorry. There is no more images for <b>{query}</b>
          </p>
        )}
      </main>
    </>
  );
}

// class App extends Component {
//   state = {
//     query: '',
//     page: 1,
//     items: [],
//     totalItems: 0,
//     loadingStatus: false,
//     noResult: false,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     if (this.state.items.length > 12) {
//       this.smoothScroll();
//     }

//     if (
//       prevState.query !== this.state.query ||
//       prevState.page !== this.state.page
//     ) {
//       if (prevState.query !== this.state.query) {
//         this.setState({ items: [] });
//       }
//       try {
//         this.changeLoadingStatus(true);
//         const response = await axios.get(
//           `${BASE_URL}?key=${API_KEY}&q=${this.state.query}&image_type=photo&orientation=horizontal&per_page=12&page=${this.state.page}`
//         );

//         this.onSearch(response.data.hits, response.data.totalHits);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         this.changeLoadingStatus(false);
//       }
//     }
//   }

//   smoothScroll = () => {
//     const { height: cardHeight } = document
//       .querySelector('li')
//       .firstElementChild.getBoundingClientRect();
//     window.scrollBy({
//       top: cardHeight * 2,
//       behavior: 'smooth',
//     });
//   };

//   handleFormSubmit = value => {
//     this.setState(prevState => ({
//       query: value,
//       page: 1,
//       // items: [],
//       noResult: false,
//     }));
//   };

//   handleOnLoadMoreClick = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   onSearch = (response, totalItems) => {
//     this.setState(prevState => ({
//       items: [...prevState.items, ...response],
//       totalItems,
//       // query: '',
//     }));

//     if (response.length === 0) {
//       this.setState({ noResult: true });
//     }
//   };

//   changeLoadingStatus = status => {
//     this.setState({ loadingStatus: status });
//   };

//   render() {
//     const { query, page, items, loadingStatus, totalItems, noResult } =
//       this.state;
//     return (
//       <>
//         <ToastContainer autoClose={3000} />
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         <main id="main">
//           {noResult && (
//             <p className={css.noFoundText}>
//               Sorry. There is no images for <b>{query}</b>
//             </p>
//           )}
//           <ImageGallery
//             query={query}
//             page={page}
//             items={items}
//             loadingStatus={loadingStatus}
//           />
//           {items.length > 0 && items.length < totalItems && (
//             <Button onClick={this.handleOnLoadMoreClick} />
//           )}
//           {items.length > 0 && items.length >= totalItems && (
//             <p className={css.endMessage}>
//               Sorry. There is no more images for <b>{query}</b>
//             </p>
//           )}
//         </main>
//       </>
//     );
//   }
// }

// export default App;
