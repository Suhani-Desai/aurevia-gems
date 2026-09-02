import { useEffect, useState } from 'react';
import { BrandStory } from '../../components/public/BrandStory';
import { CraftSection } from '../../components/public/CraftSection';
import { FeaturedProducts } from '../../components/public/FeaturedProducts';
import { FinalCta } from '../../components/public/FinalCta';
import { Hero } from '../../components/public/Hero';
import { MaterialsSection } from '../../components/public/MaterialsSection';
import { TrustSection } from '../../components/public/TrustSection';
import { ApiRequestError } from '../../services/api';
import * as publicCatalogService from '../../services/publicCatalogService';
import type { Product } from '../../types';

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        setProducts(await publicCatalogService.listPublicProducts());
      } catch (err) {
        setError(
          err instanceof ApiRequestError
            ? err.message
            : 'Unable to load catalogue.',
        );
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  return (
    <>
      <Hero />
      <BrandStory />
      <MaterialsSection />
      <FeaturedProducts products={products} loading={loading} error={error} />
      <TrustSection />
      <CraftSection />
      <FinalCta />
    </>
  );
}
