//
//  RCTHealthkitImportModule.m
//  Runner
//
//  Created by Rodrigo Alonso on 19-06-23.
//

#import <React/RCTLog.h>
#import "RCTHealthkitImportModule.h"
#import <HealthKit/HealthKit.h>


@interface RCTHealthkitImportModule ()

@property (nonatomic, retain) HKHealthStore *healthStore;
  
@end

@implementation RCTHealthkitImportModule

- (id)init
{
  self = [super init];
  if (self) {
    if ([HKHealthStore isHealthDataAvailable]) {
      self.healthStore = [[HKHealthStore alloc] init];
    }
  }
  
  return self;
}

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

RCT_EXPORT_METHOD(isAvailable:(RCTPromiseResolveBlock)resolve rejected:(RCTPromiseRejectBlock)reject) {
  if (!self.healthStore) {
    resolve(@(NO));
  } else {
    resolve(@(YES));
  }
}

RCT_EXPORT_METHOD(requestAuthorization:(RCTPromiseResolveBlock)resolve rejected:(RCTPromiseRejectBlock)reject) {
  if (!self.healthStore) {
    resolve(nil);
    return;
  }
  
  NSArray *readTypes = @[[HKObjectType workoutType]];
  [self.healthStore requestAuthorizationToShareTypes:nil readTypes:[NSSet setWithArray:readTypes] completion:^(BOOL success, NSError * _Nullable error) {
    resolve(nil);
  }];
}

RCT_EXPORT_METHOD(fetchRuns:(RCTPromiseResolveBlock)resolve rejected:(RCTPromiseRejectBlock)reject) {
  if (!self.healthStore) {
    reject(nil, @"Healthkit is not available", nil);
    return;
  }
  
  HKSampleType *sampleType = [HKObjectType workoutType];
  HKSampleQuery *query = [[HKSampleQuery alloc] initWithSampleType:sampleType predicate:nil limit:HKObjectQueryNoLimit sortDescriptors:nil resultsHandler:^(HKSampleQuery * _Nonnull query, NSArray<__kindof HKWorkout *> * _Nullable results, NSError * _Nullable error) {
    
    NSMutableArray *runs = [NSMutableArray arrayWithCapacity:[results count]];
    
    [results enumerateObjectsUsingBlock:^(__kindof HKWorkout * _Nonnull workout, NSUInteger idx, BOOL * _Nonnull stop) {
      NSMutableDictionary *run = [NSMutableDictionary dictionary];
      
      // Skip if is not running workout
      if (workout.workoutActivityType != HKWorkoutActivityTypeRunning) {
        return;
      }
      
      // Duration in seconds
      double durationSeconds = workout.duration;
      run[@"durationSeconds"] = @(durationSeconds);
      
      // Distance in meters
      HKStatistics *runDistanceStatistic = [workout statisticsForType:[HKQuantityType quantityTypeForIdentifier:HKQuantityTypeIdentifierDistanceWalkingRunning]];
      HKQuantity *distanceQuantity = [runDistanceStatistic sumQuantity];
      double distanceDouble = [distanceQuantity doubleValueForUnit:[HKUnit meterUnit]];
      run[@"distanceMeters"] = @(distanceDouble);
      
      // Date in seconds since epoch
      double timeIntervalSinceEpoch = [workout.startDate timeIntervalSince1970];
      run[@"timeIntervalSinceEpoch"] = @(timeIntervalSinceEpoch);

      [runs addObject:run];
    }];
    
    resolve(runs);
  }];
  
  [self.healthStore executeQuery:query];
}

RCT_EXPORT_MODULE();

@end
