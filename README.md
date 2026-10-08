import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

const cancerTypes = ['All', 'Breast Cancer', 'Lung Cancer', 'Prostate Cancer', 'Glioblastoma', 'Leukemia'];

const studies = [
  {
    id: 'study-1',
    cancerType: 'Breast Cancer',
    therapy: 'Trastuzumab deruxtecan',
    score: 96,
    status: 'Phase III',
    summary: 'Novel HER2-targeted ADC with strong progression-free survival gains.',
  },
  {
    id: 'study-2',
    cancerType: 'Lung Cancer',
    therapy: 'Dual checkpoint inhibition',
    score: 91,
    status: 'Phase II',
    summary: 'PD-L1 positive subgroups respond strongly to combination therapy.',
  },
  {
    id: 'study-3',
    cancerType: 'Prostate Cancer',
    therapy: 'AR-targeted precision therapy',
    score: 88,
    status: 'Phase II',
    summary: 'Resistance reversal potential in biomarker-positive cases.',
  },
  {
    id: 'study-4',
    cancerType: 'Glioblastoma',
    therapy: 'Tumor vaccine + immune modulation',
    score: 84,
    status: 'Phase I/II',
    summary: 'Immune infiltration signals show promise in recurrent disease.',
  },
];

export default function App() {
  const [selectedCancer, setSelectedCancer] = useState('All');
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('admin@oncology.research');
  const [password, setPassword] = useState('demo123');
  const [loggedIn, setLoggedIn] = useState(true);

  const filteredStudies = useMemo(() => {
    return studies.filter((study) => {
      const matchesCancer = selectedCancer === 'All' || study.cancerType === selectedCancer;
      const text = `${study.cancerType} ${study.therapy} ${study.summary}`.toLowerCase();
      const matchesQuery = !search || text.includes(search.trim().toLowerCase());
      return matchesCancer && matchesQuery;
    });
  }, [search, selectedCancer]);

  if (!loggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.authContainer}>
          <Text style={styles.title}>Cancer Research Access</Text>
          <Text style={styles.subtitle}>Sign in to secure clinical research insights</Text>
          <TextInput value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor="#8ca7c7" style={styles.input} />
          <TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor="#8ca7c7" style={styles.input} secureTextEntry />
          <TouchableOpacity style={styles.primaryButton} onPress={() => setLoggedIn(true)}>
            <Text style={styles.primaryButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Cancer Cure Research</Text>
          <TouchableOpacity onPress={() => setLoggedIn(false)}>
            <Text style={styles.logout}>Log out</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>AI-guided oncology research and trial insight</Text>

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search cancer, therapy, biomarker"
          placeholderTextColor="#8ca7c7"
          style={styles.searchInput}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
          {cancerTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.chip, selectedCancer === type && styles.chipSelected]}
              onPress={() => setSelectedCancer(type)}
            >
              <Text style={[styles.chipText, selectedCancer === type && styles.chipTextSelected]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total</Text>
            <Text style={styles.statValue}>{filteredStudies.length}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Critical</Text>
            <Text style={styles.statValue}>{filteredStudies.filter((item) => item.score >= 90).length}</Text>
          </View>
        </View>

        {filteredStudies.map((study) => (
          <View key={study.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cancerTag}>{study.cancerType}</Text>
              <Text style={styles.scoreTag}>Score {study.score}</Text>
            </View>
            <Text style={styles.cardTitle}>{study.therapy}</Text>
            <Text style={styles.cardMeta}>{study.status} • Biomarker-guided</Text>
            <Text style={styles.summary}>{study.summary}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07141f',
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#07141f',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#edf6ff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#abd0f7',
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#0e2134',
    borderColor: '#234870',
    borderWidth: 1,
    borderRadius: 12,
    color: '#edf6ff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 18,
  },
  input: {
    backgroundColor: '#0e2134',
    borderColor: '#234870',
    borderWidth: 1,
    borderRadius: 12,
    color: '#edf6ff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  primaryButton: {
    backgroundColor: '#4b6cf7',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  chipRow: {
    paddingBottom: 16,
  },
  chip: {
    backgroundColor: '#10233a',
    borderColor: '#2d4b6a',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
  },
  chipSelected: {
    backgroundColor: '#2d4dd2',
    borderColor: '#5b7cff',
  },
  chipText: {
    color: '#dfeaf9',
    fontWeight: '600',
  },
  chipTextSelected: {
    color: '#ffffff',
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 18,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#0d1e2e',
    borderColor: '#224466',
    borderWidth: 1,
    padding: 16,
    borderRadius: 16,
  },
  statLabel: {
    fontSize: 12,
    color: '#a8c6e6',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 26,
    fontWeight: '800',
    color: '#f4f9ff',
  },
  card: {
    backgroundColor: '#0d1b2a',
    borderColor: '#214261',
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cancerTag: {
    backgroundColor: '#271d4f',
    color: '#d9c7ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: '700',
  },
  scoreTag: {
    color: '#9feccf',
    fontWeight: '700',
  },
  cardTitle: {
    color: '#edf6ff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardMeta: {
    color: '#a9bfd7',
    fontSize: 13,
    marginBottom: 12,
  },
  summary: {
    color: '#dfeaf8',
    fontSize: 15,
    lineHeight: 22,
  },
  logout: {
    color: '#8ad4ff',
    fontWeight: '700',
  },
});
