//
//  RCTHealthkitImportModule.m
//  Runner
//
//  Created by Rodrigo Alonso on 19-06-23.
//

#import <React/RCTLog.h>
#import "RCTHealthkitImportModule.h"

@implementation RCTHealthkitImportModule

RCT_EXPORT_METHOD(add:(double)a
                  b:(double)b
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  RCTLogInfo(@"HealthkitImportModule %f, %f", a, b);
  resolve(@(a + b));
}

RCT_EXPORT_MODULE();

@end
