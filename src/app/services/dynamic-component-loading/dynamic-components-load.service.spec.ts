import { TestBed } from '@angular/core/testing';

import { DynamicComponentsLoadService } from './dynamic-components-load.service';
import { loadRemoteModule } from '@angular-architects/native-federation';

jest.mock('@angular-architects/native-federation', () => ({
  loadRemoteModule: jest.fn(),
}));
describe('DynamicComponentsLoadService', () => {
  let service: DynamicComponentsLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicComponentsLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  

  describe('loadRemoteSafely', () => {
    it('should load remote module successfully', async () => {
      // Mock the implementation to return a resolved promise
      const mockModule = { some: 'module' };
      (loadRemoteModule as jest.Mock).mockResolvedValue(mockModule);

      const remoteName = 'blue-team';
      const exposedModule = './Buttons';

      const result = await service.loadRemoteSafely(remoteName, exposedModule);

      // Assert that the module is loaded successfully
      expect(result).toBe(mockModule);
      expect(loadRemoteModule).toHaveBeenCalledWith({
        remoteName: remoteName,
        exposedModule: exposedModule,
      });
    });

    it('should return null when loading the remote module fails', async () => {
      // Mock the implementation to return a rejected promise
      (loadRemoteModule as jest.Mock).mockRejectedValue(
        new Error('Load error')
      );

      const remoteName = 'testRemote';
      const exposedModule = './Module';

      const result = await service.loadRemoteSafely(remoteName, exposedModule);

      // Assert that it returns null on failure
      expect(result).toBeNull();
      expect(loadRemoteModule).toHaveBeenCalledWith({
        remoteName: remoteName,
        exposedModule: exposedModule,
      });
    });
  });
});
