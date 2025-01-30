import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import Loader from './Loader';

function AppLayout() {
  // 'useNavigation' is a hook that provides access to the navigation state. It is used to tell whether the page is loading data or is idle.
  // state can be idle, loading, or submitting
  const navigation = useNavigation();

  // It will be true if 'navigation.state' is loading and false otherwise.
  const isLoading = navigation.state === 'loading';

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Header />

      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          {/* <h1>Content</h1> */}
          {/* 'Outlet' is used to render child routes */}
          {/* It is used in the parent componenet to render whatever is the current nested route. */}
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
