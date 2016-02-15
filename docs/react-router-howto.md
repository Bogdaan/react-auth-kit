## React router howto

This kit works on react-router, and **src/routes.js** contain all application routes
plus some auth/redirect hooks. If you need place async data dependency in route,
you need use following pattern:

```
const getCatalogPage = async (location, callback) => {
  const response = await fetch('/api/products');
  const data = await response.json();

  ProductStore.setProducts( data )

  callback(null, () => <CatalogPage />);
}

...

<Route path='catalogPage' getComponent={getCatalogPage} />
```


If you need auth-protected page:

```
....
<Route path='catalogPage' getComponent={getCatalogPage} onEnter={requireAuth} />
```


### Lazy routes

not supported, but PR is welcome )
