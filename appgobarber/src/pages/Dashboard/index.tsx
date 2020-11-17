import React from 'react';
import { View, Button, Text } from 'react-native';

import { useAuth } from '../../hooks/Auth';

const dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View>
      <Button
        onPress={signOut}
        title="Sair"
      >
        <Text>Sair</Text>
      </Button>
    </View>
  )
}

export default dashboard;