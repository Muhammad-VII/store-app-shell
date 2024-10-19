import { loadRemoteModule } from '@angular-architects/native-federation';
import { Injectable, Injector, QueryList, ViewContainerRef } from '@angular/core';
import { DynamicComponentDirective } from '../../directives/dynamic-component.directive';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentsLoadService {
  async loadComponent(
    dynamicHosts: QueryList<DynamicComponentDirective>,
    componentsToLoad: any[],
    injector: Injector,
    data: any
  ) {
    for (const componentConfig of componentsToLoad) {
      componentConfig.remoteName,
        componentConfig.exposedModule,
        componentConfig.index;
      const remoteComponent = await this.loadRemoteSafely(
        componentConfig.remoteName,
        componentConfig.exposedModule
      ).then((m) => m[Object.keys(m)[0]]); // Dynamically get the exposed component

      // Get the corresponding dynamic host
      const viewContainerRef =
        dynamicHosts.toArray()[componentConfig.index].viewContainerRef;
      viewContainerRef.clear(); // Clear previous component if needed

      // Create the component dynamically in the specified section
      const componentRef = viewContainerRef.createComponent(remoteComponent, {
        injector,
      });
      (componentRef.instance as any).dataFromHost = data;
    }
  }
  async loadRemoteSafely(remoteName: string, exposedModule: string) {
    try {
      const module = await loadRemoteModule({
        remoteName: remoteName,
        exposedModule: exposedModule,
      });
      return module;
    } catch (error) {
      console.error(`Failed to load remote: ${remoteName}`, error);
      return null;
    }
  }
}
