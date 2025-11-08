import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import type { DisplayedPost } from '../types';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

export const PostPDF = (props: DisplayedPost) => 
  {
    const { title, body, userName } = props;
    return(
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>{title}</Text>
            <Text>{body}</Text>
            <Text>{userName}</Text>
          </View>
      </Page>
    </Document>);
}
