export default [...new Array(10)].map((_, index) => ({
  id: index,
  name: 'Some Restaurant',
  icon:
    'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png',
  photos: [
    'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg',
  ],
  address: '100 some random street',
  isOpenNow: true,
  rating: 4,
  isClosedTemporarily: true,
}));
