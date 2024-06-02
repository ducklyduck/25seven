import React from 'react';
import notifee from '@notifee/react-native';
import {View, Button} from 'react-native';


async function onDisplayNotification(taskCount) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  // try {
    await notifee.displayNotification({
      title: 'You have work to do',
      body: `You have ${taskCount} uncompleted tasks. Don't forget it!`,
      android: {
        channelId,
        largeIcon: require('../../assets/noftification-icon.png'), // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  // } catch {
  //   console.error(err);
  // }
}
const NoftificationItem = () => {
  return (
    <View>
      <Button title="Display Notification" onPress={() => {}} />
    </View>
  );
};

export default onDisplayNotification;
