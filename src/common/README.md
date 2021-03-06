# MB & OLB: common api code refactoring

Create a git sub-module for the common code that interacts with the REST API to be shared by both OLB & MB.

## usage modules
- node-forge
- lodash
- axios


## init 
init ApiServiceProvider before usage
```typescript
// Api init
ApiServiceProvider.setStorageService(new StorageService());
ApiServiceProvider.setI18n({
  globalT,
  globalTExist,
});
ApiServiceProvider.navigate = utilNavigate;
// -- end of Api init
```
