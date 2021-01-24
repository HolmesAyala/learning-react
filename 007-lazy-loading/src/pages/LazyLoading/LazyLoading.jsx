import React, { Suspense } from 'react';
/**
 * Components
 */
const PetList = React.lazy(() => import('./components/PetList'));

const Loading = () => <div>Loading...</div>;

const pets = [
  {
    name: 'Luna',
    description: `It's a pet very beautiful`
  },
  {
    name: 'Luna',
    description: `It's a pet very beautiful`
  },
  {
    name: 'Luna',
    description: `It's a pet very beautiful`
  },
  {
    name: 'Luna',
    description: `It's a pet very beautiful`
  },
  {
    name: 'Luna',
    description: `It's a pet very beautiful`
  },
  {
    name: 'Luna',
    description: `It's a pet very beautiful`
  },
];

const LazyLoading = () => {
  console.log('render lazy loading');

  return (
    <div>
      <h1>Pet list</h1>

      <Suspense fallback={<Loading />}>
        <PetList items={pets} />
      </Suspense>
    </div>
  );
}

export default LazyLoading;
