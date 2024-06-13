import notifee from '@notifee/react-native';

async function onDisplayNotification(taskCount) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

    await notifee.displayNotification({
      title: 'You have work to do',
      body: `You have ${taskCount} uncompleted tasks. Don't forget it!`,
      android: {
        channelId,
        largeIcon: require('../../assets/noftification-icon.png'),
        pressAction: {
          id: 'default',
        },
      },
    });
}

export default onDisplayNotification;
