# Runner

Runner is a mobile app developed with react native that lets you store your running workouts data and see aggregated statistics about them. On iOS devices, it can import your running workouts data directly from Apple Fitness.

## Motivation

The Apple Fitness app only shows aggregated workout data up to a period of a month. So, if you want to know how much distance you ran over an entire year you can't (at least not directly, as you would have to add each month distance manually). Although making an app just for this is a bit overkill, this seemed like a great opportunity to practice react native skills.

## Main features

- Add and edit running workouts.
- View a summary of your running workouts (aggregated data), by month, year, or everything.
- Import running workouts from Apple Fitness in iOS devices (done from the app settings).
- Shoe usage tracking

### Additional features

- Change unit system (metric or imperial) from app settings.
- Change theme (light or dark) from app settings.

## Requirements

- Node 18
- Xcode 14.3 (iOS)
- Android Studio latest release (Android)

## Environment setup

The environment setup instructions heavily depend on the operating system in which the app will be developed and deployed.
Instructions for each OS can be found here: https://reactnative.dev/docs/0.71/environment-setup?os=macos&platform=ios

### Considerations

This app was developed and optimized for iOS devices (Android may work but is missing configuration for now).

## Screenshots

| **Runs list in My runs tab**                                                 | **Individual run details**                                       | **New/edit run form**                                                          |
|------------------------------------------------------------------------------|------------------------------------------------------------------|--------------------------------------------------------------------------------|
| ![Runs list](/docs/screenshots/1-run-list.png "Runs list")                   | ![Run details](/docs/screenshots/2-run-detail.png "Run details") | ![New/edit run form](/docs/screenshots/3-run-new-edit.png "New/edit run form") |
| **Runs summary in Summary tab**                                              | **Shoe list in My shoes tab**                                    | **Shoe details**                                                               |
| ![Runs summary](/docs/screenshots/4-run-summary.png "Runs summary")          | ![Shoes list](/docs/screenshots/5-shoe-list.png "Shoes list")    | ![Shoe details](/docs/screenshots/6-shoe-detail.png "Shoe details")            |
| **New/edit shoe form**                                                       | **Settings**                                                     |                                                                                |
| ![New-edit shoe form](/docs/screenshots/7-shoe-new-edit.png "Shoes details") | ![Settings](/docs/screenshots/8-settings.png "Settings")         |                                                                                |
