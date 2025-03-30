# Assets Directory

This directory contains all static assets for the application:

- `images/` - Contains all image files used in the application
- `fonts/` - Contains all font files used in the application

To ensure proper loading of assets, all references should use the appropriate path aliases:

```typescript
// Correct way to import images
import logo from '@images/logo.svg';
import profilePhoto from '@images/profile.jpg';

// Correct way to import fonts
import '@fonts/Onest-Regular.ttf';
```
